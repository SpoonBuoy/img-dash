package storage

import (
	"fmt"
	"origin-health/disk"
)

type LabelManager struct {
	labels []string
}

func NewLabelManager() *LabelManager {
	var lbls []string
	err := disk.LoadFromFile(disk.LabelsFilePath, &lbls)
	if err != nil {
		return &LabelManager{
			labels: make([]string, 0),
		}

	} else {
		return &LabelManager{labels: lbls}
	}
}

func (lm *LabelManager) AddLabels(labels []string) {
	lm.labels = append(lm.labels, labels...)
	if err := disk.SaveToFile(disk.LabelsFilePath, labels); err != nil {
		fmt.Println("failed to store labels on disk", err)
	}
}

func (lm *LabelManager) DeleteLabels(labels []string) {
	for _, label := range labels {
		lm.labels = remove(lm.labels, label)
	}
	err := disk.DeleteFile(disk.LabelsFilePath)
	if err != nil {
		fmt.Println("no file exists")
	}
	if err := disk.SaveToFile(disk.LabelsFilePath, lm.labels); err != nil {
		fmt.Println("failed to delete labels from disk", err)
	}
}

func (lm *LabelManager) ListLabels() []string {
	return lm.labels
}
