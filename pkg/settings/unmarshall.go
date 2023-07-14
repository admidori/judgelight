package settings

import (
	"errors"
	"fmt"
	"io/ioutil"
	"reflect"

	"gopkg.in/yaml.v3"
)

func parse(source string, dest interface{}) error {
	if reflect.TypeOf(dest).Kind() != reflect.Ptr {
		return errors.New("mapping: dest is not pointer")
	}
	parseError := yaml.Unmarshal([]byte(source), dest)
	return parseError
}

func UnmarshalYAML(schema *SettingParamater) {
	buf, err := ioutil.ReadFile(Yamlpath)
	if err != nil {
		fmt.Print(err)
	}

	if err := parse(string(buf), &schema); err != nil {
		fmt.Print(err)
	}
}
