package storage

import (
	"origin-health/models"
	"reflect"
	"testing"
)

func TestAddImage(t *testing.T) {
	im := NewImageManager()
	images := []models.Image{
		{Path: "/path/to/image1.jpg", Labels: []string{"label1", "label2"}},
		{Path: "/path/to/image2.jpg", Labels: []string{"label1", "label2"}},
	}

	im.AddImages(images)

	if len(im.images) != 2 || !reflect.DeepEqual(im.images[0], images[0]) {
		t.Errorf("AddImage failed. Expected: %+v, Actual: %+v", images, im.images)
	}
}

func TestAddLabels(t *testing.T) {
	im := NewImageManager()
	images := []models.Image{{Path: "/path/to/image.jpg", Labels: []string{"label1", "label2"}}}
	labelsToAdd := []string{"newlabel1", "newlabel2"}

	im.AddImages(images)
	im.AddLabelsToImage(images[0].Path, labelsToAdd)

	expectedLabels := append(images[0].Labels, labelsToAdd...)
	if !reflect.DeepEqual(im.images[0].Labels, expectedLabels) {
		t.Errorf("AddLabels failed. Expected: %+v, Actual: %+v", expectedLabels, im.images[0].Labels)
	}
}

func TestDeleteLabels(t *testing.T) {
	im := NewImageManager()
	images := []models.Image{{Path: "/path/to/image.jpg", Labels: []string{"label1", "label2", "label3"}}}
	labelsToDelete := []string{"label1", "label3"}

	im.AddImages(images)
	im.DeleteLabeslFromImage(images[0].Path, labelsToDelete)

	expectedLabels := []string{"label2"}
	if !reflect.DeepEqual(im.images[0].Labels, expectedLabels) {
		t.Errorf("DeleteLabesl failed. Expected: %+v, Actual: %+v", expectedLabels, im.images[0].Labels)
	}
}

func TestGetImages(t *testing.T) {
	im := NewImageManager()
	images := []models.Image{{Path: "/path/to/image.jpg", Labels: []string{"label1", "label2", "label3"}}}
	im.AddImages(images)
	retrievedImages := im.GetImages(-1)
	if !reflect.DeepEqual(images, retrievedImages) {
		t.Errorf("GetImages failed. Expected: %+v, Actual: %+v", images, retrievedImages)
	}
}

func TestGetImagesWithLabels(t *testing.T) {
	im := NewImageManager()
	images := []models.Image{
		{Path: "/path/to/image1.jpg", Labels: []string{"label1", "label2", "label3"}},
		{Path: "/path/to/image2.jpg", Labels: []string{"labelx", "labely", "labelz"}},
	}
	im.AddImages(images)
	retrievedImages := im.GetImagesWithLabels(-1, []string{"labelx"})
	if !reflect.DeepEqual(images[1], retrievedImages[0]) {
		t.Errorf("GetImages failed. Expected: %+v, Actual: %+v", images[1], retrievedImages)
	}
}
