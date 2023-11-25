package storage

import (
	"origin-health/models"
	"testing"
)

func TestAddAndGetUser(t *testing.T) {
	userManager := NewUserManager()

	user := &models.User{
		Username: "Arsalan",
		Email:    "arsalan@xyz.com",
		IsAdmin:  true,
	}

	userManager.AddUser(*user)

	retrievedUser, err := userManager.GetUser(user.Email)

	if err != nil {
		t.Errorf("Expected user to be present, got nil")
	}

	if retrievedUser.Username != "Arsalan" {
		t.Errorf("Expected username to be 'testuser', got %s", retrievedUser.Username)
	}
}
