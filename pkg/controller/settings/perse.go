package settings

import (
	"errors"
	"reflect"
	"time"

	"gopkg.in/yaml.v3"
)

func Parse(source string, dest interface{}) error {
	if reflect.TypeOf(dest).Kind() != reflect.Ptr {
		return errors.New("mapping: dest is not pointer")
	}
	parseError := yaml.Unmarshal([]byte(source), dest)
	return parseError
}

func TimePerse(t string) time.Time {
	persedTime, _ := time.Parse("2006-01-02 15:04:05", t)
	return persedTime
}
