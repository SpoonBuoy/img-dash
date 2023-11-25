package storage

import (
	"fmt"
	"origin-health/disk"
	"origin-health/models"
)

var PageSize int = 10

type ImageManager struct {
	images []models.Image
}

func NewImageManager() *ImageManager {
	var imgs []models.Image
	err := disk.LoadFromFile(disk.ImagesFilePath, &imgs)
	if err != nil {
		//fmt.Println("Falied to load images from file", err)
		return &ImageManager{
			images: make([]models.Image, 0),
		}
	}
	return &ImageManager{
		images: imgs,
	}
}

func (im *ImageManager) AddImages(images []models.Image) {
	//fmt.Println("adding")
	if err := disk.SaveToFile(disk.ImagesFilePath, images); err != nil {
		fmt.Println("failed to store images on disk", err)
	}
	im.images = append(im.images, images...)
}

func (im *ImageManager) AddLabelsToImage(image string, lables []string) {
	to_find_img_path := image
	for i := range im.images {
		//found the image that needs to change
		if im.images[i].Path == to_find_img_path {
			im.images[i].Labels = append(im.images[i].Labels, lables...)
		}
	}
	fmt.Println("adding label to ", image, lables)
	err := disk.DeleteFile(disk.ImagesFilePath)
	if err != nil {
		fmt.Println("no file exists")
	}
	if err := disk.SaveToFile(disk.ImagesFilePath, im.images); err != nil {
		fmt.Println("failed to store labels on images", err)
	}
}
func (im *ImageManager) DeleteLabeslFromImage(image string, lables []string) {
	to_find_img_path := image
	for i := range im.images {
		//found the image that needs to change
		if im.images[i].Path == to_find_img_path {
			//remove the labels from this image
			for _, label := range lables {
				im.images[i].Labels = remove(im.images[i].Labels, label)
			}
		}
	}
	err := disk.DeleteFile(disk.ImagesFilePath)
	if err != nil {
		fmt.Println("no file exists")
	}
	if err := disk.SaveToFile(disk.ImagesFilePath, im.images); err != nil {
		fmt.Println("failed to delete labels on images", err)
	}
}

func (im *ImageManager) GetImages(page int) []models.Image {
	var from, to, offset int
	if page < 1 {
		offset = 0
	} else {
		offset = (page - 1) * PageSize
	}
	from = offset
	if offset+PageSize >= len(im.images) {
		to = len(im.images)
	} else {
		to = offset + PageSize
	}
	//fmt.Println(im.images)
	// fmt.Println("Page", page)
	// fmt.Println(from, "-", to)
	if from <= to {
		return im.images[from:to]
	} else {
		return []models.Image{}
	}
	//return im.images[from:to]
}

func (im *ImageManager) GetImagesWithLabels(page int, labels []string) []models.Image {
	var filteredImages []models.Image
	for _, img := range im.images {
		// Check if any of the targetLabels are present in the img.Labels slice
		for _, label := range img.Labels {
			for _, targetLabel := range labels {
				if label == targetLabel {
					// Append the image to the filteredImages slice if a matching label is found
					filteredImages = append(filteredImages, img)
					break
				}
			}
		}
	}
	var from, to, offset int
	if page < 1 {
		offset = 0
	} else {
		offset = (page - 1) * PageSize
	}

	from = offset
	if offset+PageSize >= len(filteredImages) {
		to = len(filteredImages)
	} else {
		to = offset + PageSize
	}
	return filteredImages[from:to]
}

// helper functions
func remove(s []string, r string) []string {
	for i, v := range s {
		if v == r {
			return append(s[:i], s[i+1:]...)
		}
	}
	return s
}
