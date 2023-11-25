package storage

import (
	"errors"
	"fmt"
	"origin-health/disk"
	"origin-health/models"
)

type UserManager struct {
	users []models.User
}

func NewUserManager() *UserManager {
	var usrs []models.User
	err := disk.LoadFromFile(disk.UsersFilePath, &usrs)
	if err != nil {
		return &UserManager{
			users: make([]models.User, 0),
		}

	} else {
		return &UserManager{users: usrs}
	}
}

func (um *UserManager) AddUser(user models.User) {
	um.users = append(um.users, user)
	if err := disk.SaveToFile(disk.UsersFilePath, user); err != nil {
		fmt.Println("failed to add user on disk", err)
	}
}

func (um UserManager) GetUser(email string) (models.User, error) {
	for _, user := range um.users {
		if user.Email == email {
			return user, nil
		}
	}
	return models.User{}, errors.New("no such user found")
}
