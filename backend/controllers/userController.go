package controllers

import (
	"net/http"
	"origin-health/dto"
	"origin-health/models"
	"origin-health/storage"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	um *storage.UserManager
}

func NewUserController(UM *storage.UserManager) *UserController {
	return &UserController{um: UM}
}

func (uc *UserController) Signup(c *gin.Context) {
	//get email, pwd, username
	var body dto.CreateUserRequest

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	//hash the pwd
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash password"})
		return
	}
	if usr, err := uc.um.GetUser(body.Email); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "user already exists with this email", "user-name": usr.Username})
		return
	}
	//create the user
	user := models.User{
		Username: body.UserName,
		Email:    body.Email,
		Password: string(hash),
		IsAdmin:  body.IsAdmin,
	}
	uc.um.AddUser(user)
	c.JSON(http.StatusOK, gin.H{"message": "user created"})
}

func (uc *UserController) Login(c *gin.Context) {
	var body dto.LoginUserRequest
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	//look up the user
	user, err := uc.um.GetUser(body.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email or password"})
		return
	}

	//compare sent in pass with saved user pass hash
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email or password"})
		return
	}
	//generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Email,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})
	//fmt.Println(token)
	//signt the token
	secret := "lmaolmaolmaolmao"
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create token string"})
		return
	}
	//send it back
	c.SetCookie("Auth", tokenString, 3600*24, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"message": "logged in successfully",
	})
}
func (uc *UserController) Logout(c *gin.Context) {
	c.SetCookie("Auth", "", -1, "/", "", false, true)

	// Redirect or respond as needed after logout
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}
func (uc *UserController) GetUser(email string) (models.User, error) {
	usr, err := uc.um.GetUser(email)
	if err != nil {
		return usr, err
	}
	return usr, nil
}
