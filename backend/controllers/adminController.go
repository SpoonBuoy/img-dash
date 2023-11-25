package controllers

import (
	"fmt"
	"net/http"
	"origin-health/dto"
	"origin-health/models"
	"origin-health/storage"

	"github.com/gin-gonic/gin"
)

// var lm = storage.NewLabelManager()
type AdminController struct {
	lm *storage.LabelManager
	im *storage.ImageManager
}

func NewAdminController(LM *storage.LabelManager, IM *storage.ImageManager) *AdminController {
	return &AdminController{lm: LM, im: IM}
}

func (ac *AdminController) CreateLabels(c *gin.Context) {
	var body dto.CreateLabelsRequest
	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "failed to bind json"})
		return
	}
	ac.lm.AddLabels(body.Labels)
	c.JSON(200, gin.H{"message": "labels added"})
}

func (ac *AdminController) RemoveLabels(c *gin.Context) {
	var body dto.RemoveLabelsRequest
	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}
	ac.lm.DeleteLabels(body.Labels)
	c.JSON(200, gin.H{"message": "labels deleted"})

}
func (ac *AdminController) ListLabels(c *gin.Context) {
	labels := ac.lm.ListLabels()
	c.JSON(200, gin.H{"labels": labels})
}

func (ac *AdminController) UploadImages(c *gin.Context) {
	var body dto.UploadImageRequest
	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}
	ac.im.AddImages(body.Images)
	c.JSON(200, gin.H{"message": "images uploaded"})
}

func (ac *AdminController) Upload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, fmt.Sprintf("Error: %s", err.Error()))
		return
	}

	files := form.File["files"]
	var imgs []models.Image
	for _, file := range files {
		// Save the file on the server
		dst := "./disk/images/" + file.Filename
		fmt.Println(dst)
		if err := c.SaveUploadedFile(file, dst); err != nil {
			c.JSON(http.StatusInternalServerError, fmt.Sprintf("Error: %s", err.Error()))
			return
		}
		path := "http://localhost:8080/uploads/" + file.Filename
		img := models.Image{
			Path:   path,
			Labels: make([]string, 0),
		}
		imgs = append(imgs, img)
	}
	ac.im.AddImages(imgs)
	c.JSON(http.StatusOK, "Files uploaded successfully!")
}
