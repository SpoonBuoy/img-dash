package models

type Image struct {
	Path   string   `json:"path"`
	Labels []string `json:"labels"`
}
