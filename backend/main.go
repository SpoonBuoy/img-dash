package main

import (
	"fmt"
	"origin-health/controllers"
	"origin-health/middleware"
	"origin-health/storage"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}
	r.Use(cors.New(config))
	gin.SetMode(gin.ReleaseMode)
	fmt.Println("Server Running")
	lm := storage.NewLabelManager()
	im := storage.NewImageManager()
	um := storage.NewUserManager()

	adminController := controllers.NewAdminController(lm, im)
	feedController := controllers.NewFeedController(im)
	userController := controllers.NewUserController(um)
	r.Static("/uploads/", "./disk/images")

	//tested apis
	r.POST("/signup", userController.Signup)
	r.POST("/login", userController.Login)
	r.GET("/logout", userController.Logout)
	r.POST("/labels", middleware.RequireAdminAuth, adminController.CreateLabels)
	r.POST("/delete-labels", middleware.RequireAdminAuth, adminController.RemoveLabels)
	r.GET("/labels", middleware.RequireUserAuth, adminController.ListLabels)
	r.POST("/add-labels", middleware.RequireUserAuth, feedController.AddLabelsToImage)
	r.POST("/remove-labels", middleware.RequireUserAuth, feedController.RemoveLabelsFromImage)
	r.POST("/uploadimages", middleware.RequireAdminAuth, adminController.UploadImages)
	r.POST("/images", middleware.RequireUserAuth, feedController.ListImages)
	r.POST("/upload", middleware.RequireUserAuth, adminController.Upload)
	r.GET("/valid-user", middleware.ValidateUser)
	r.GET("/valid-admin", middleware.ValidateAdmin)

	r.Run()
}
