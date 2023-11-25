package middleware

import (
	"fmt"
	"net/http"
	"origin-health/models"
	"origin-health/storage"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func RequireAuth(c *gin.Context) {
	fmt.Println("In Middleware")
	//get cookie of request
	tokenString, err := c.Cookie("Auth")
	//fmt.Println(tokenString)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	//validate it

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			c.AbortWithStatus(http.StatusUnauthorized)
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		secret := []byte("lmaolmaolmaolmao")
		return secret, nil
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Failed to parse the token %v %v", err, tokenString),
		})
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//fmt.Println(claims["foo"], claims["nbf"])
		//get expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		//find user with token sub
		//var user models.User
		um := storage.NewUserManager()
		usr, err := um.GetUser(claims["sub"].(string))
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		//attach to req
		c.Set("user", usr)

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}

func RequireAdminAuth(c *gin.Context) {
	RequireAuth(c)
	//var user models.User
	user, exists := c.Get("user")
	if !exists {
		//fmt.Println(user)
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	if userModel, ok := user.(models.User); ok {
		if userModel.IsAdmin {
			//admin is authorised
			fmt.Println(userModel.Username)
			c.Next()
		} else {
			//unauthorised to access
			fmt.Println("unable to bind")
			c.AbortWithStatus(http.StatusUnauthorized)
		}
	} else {
		c.AbortWithStatus(http.StatusInternalServerError)
	}
}

func RequireUserAuth(c *gin.Context) {
	RequireAuth(c)
	c.Next()
}

func ValidateUser(c *gin.Context) {
	RequireAuth(c)
	user, _ := c.Get("user")
	c.JSON(200, gin.H{"user": user})
}

func ValidateAdmin(c *gin.Context) {
	RequireAdminAuth(c)
	user, _ := c.Get("user")
	c.JSON(200, gin.H{"user": user})
}
