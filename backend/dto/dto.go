package dto

import "origin-health/models"

type CreateUserRequest struct {
	UserName string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IsAdmin  bool   `json:"isAdmin"`
}

type LoginUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UploadImageRequest struct {
	Images []models.Image `json:"images"`
}

type CreateLabelsRequest struct {
	Labels []string `json:"labels"`
}

type RemoveLabelsRequest struct {
	Labels []string `json:"labels"`
}

type AddLabelsToImageRequest struct {
	Image  string   `json:"image"`
	Labels []string `json:"labels"`
}

type RemoveLabelsFromImageRequest struct {
	Image  string   `json:"image"`
	Labels []string `json:"labels"`
}

type ListImagesRequest struct {
	Filters []string `json:"filters"`
}
