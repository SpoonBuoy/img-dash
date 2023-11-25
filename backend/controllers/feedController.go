package controllers

import (
	"fmt"
	"net/http"
	"origin-health/dto"
	"origin-health/models"
	"origin-health/storage"
	"strconv"

	"github.com/gin-gonic/gin"
)

type FeedController struct {
	im *storage.ImageManager
}

func NewFeedController(IM *storage.ImageManager) *FeedController {
	return &FeedController{im: IM}
}

func (fc *FeedController) AddLabelsToImage(c *gin.Context) {
	var body dto.AddLabelsToImageRequest
	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}
	fc.im.AddLabelsToImage(body.Image, body.Labels)
	c.JSON(200, gin.H{"message": "labels added to image"})
}

func (fc *FeedController) RemoveLabelsFromImage(c *gin.Context) {
	var body dto.RemoveLabelsFromImageRequest
	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to bind json"})
		return
	}
	fc.im.DeleteLabeslFromImage(body.Image, body.Labels)
	c.JSON(200, gin.H{"message": "labels removed from image"})
}

func (fc *FeedController) ListImages(c *gin.Context) {
	var body dto.ListImagesRequest
	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "failed to bind json in List Images"})
		return
	}
	var images []models.Image
	// Pagination parameters
	page, err := strconv.Atoi(c.Query("page"))
	fmt.Println("Page Number", page)
	if err != nil {
		page = -1
	}
	if len(body.Filters) == 0 {
		//list all images
		images = fc.im.GetImages(page)
	} else {
		//list filtered images
		images = fc.im.GetImagesWithLabels(page, body.Filters)
	}
	//fmt.Println(len(images))
	c.JSON(200, gin.H{"images": images})
}
