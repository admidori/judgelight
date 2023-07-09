package settings

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v3"
)

func UnmarshalYAML(yamlPath string, m *map[interface{}]interface{}) {
	buf, err := ioutil.ReadFile(yamlPath)
	if err != nil {
		fmt.Println(err)
	}

	err = yaml.Unmarshal(buf, &m)
	if err != nil {
		panic(err)
	}
}
