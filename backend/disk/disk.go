package disk

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"origin-health/models"
	"os"
	"path/filepath"
)

var (
	ImagesFilePath = filepath.Join("disk", "local", "images.txt")
	UsersFilePath  = filepath.Join("disk", "local", "users.txt")
	LabelsFilePath = filepath.Join("disk", "local", "labels.txt")
)

//This will contain all read write operations to disk

func SaveToFile(filename string, rawData interface{}) error {
	// If the file exists, open it for append; otherwise, create a new file
	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	// Serialize each struct and append it to the file
	switch v := rawData.(type) {
	case []models.Image:
		for _, img := range v {
			data, err := json.MarshalIndent(img, "", " ")
			if err != nil {
				return err
			}

			_, err = file.Write(appendNewlineIfNotExists(data))
			if err != nil {
				return err
			}
		}
		return nil
	case models.User:
		data, err := json.MarshalIndent(v, "", " ")
		if err != nil {
			return err
		}

		_, err = file.Write(appendNewlineIfNotExists(data))
		if err != nil {
			return err
		}

		return nil
	case []string:

		for _, lbl := range v {
			data, err := json.MarshalIndent(lbl, "", " ")
			if err != nil {
				return err
			}

			_, err = file.Write(appendNewlineIfNotExists(data))
			if err != nil {
				return err
			}
		}
		return nil

	default:
		return errors.New("unknown type found")
	}

}

func LoadFromFile(filename string, result interface{}) error {
	//var images []models.Image

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	//clean the file data to perfect json data
	cleanedData := []byte{'[', '\n'}
	cleanedData = append(cleanedData, data...)
	cleanedData = removeLastComma(cleanedData)
	cleanedData = append(cleanedData, ']')
	err = json.Unmarshal(cleanedData, &result)
	if err != nil {
		return err
	}
	//fmt.Println(string(cleanedData))
	return nil
}

func DeleteFile(file string) error {
	err := os.Remove(file)

	if err != nil {
		fmt.Println("Error deleting file:", err)
		return err
	}
	return nil
}

func removeLastComma(b []byte) []byte {
	if len(b) > 0 && b[len(b)-1] == ',' {
		return b[:len(b)-1]
	}
	return b
}

func appendNewlineIfNotExists(data []byte) []byte {
	if len(data) > 0 && data[len(data)-1] != '\n' {
		data = append(data, '\n')
		data = append(data, ',')

	}
	return data
}
