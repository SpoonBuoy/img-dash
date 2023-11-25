package storage

import (
	"reflect"
	"testing"
)

func TestAddLabel(t *testing.T) {
	lm := NewLabelManager()
	label := []string{"testlabel1", "testlabel2"}

	lm.AddLabels(label)

	expectedLabels := label
	if !reflect.DeepEqual(lm.labels, expectedLabels) {
		t.Errorf("AddLabel failed. Expected: %+v, Actual: %+v", expectedLabels, lm.labels)
	}
}

func TestDeleteLabel(t *testing.T) {
	lm := NewLabelManager()
	labelToRemove := []string{"testlabel1", "testlabel2"}
	otherLabel := []string{"otherlabel1", "otherlabel2"}

	lm.AddLabels(labelToRemove)
	lm.AddLabels(otherLabel)

	lm.DeleteLabels(labelToRemove)

	expectedLabels := otherLabel
	if !reflect.DeepEqual(lm.labels, expectedLabels) {
		t.Errorf("DeleteLabel failed. Expected: %+v, Actual: %+v", expectedLabels, lm.labels)
	}
}

func TestListLabel(t *testing.T) {
	lm := NewLabelManager()
	labelToAdd := []string{"testlabel1", "testlabel2"}
	lm.AddLabels(labelToAdd)
	expectedLabels := labelToAdd
	if !reflect.DeepEqual(lm.ListLabels(), expectedLabels) {
		t.Errorf("DeleteLabel failed. Expected: %+v, Actual: %+v", expectedLabels, lm.labels)
	}
}
