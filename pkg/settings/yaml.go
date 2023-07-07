package settings

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v3"
)

func UnmarshalYAML(yamlPath string) {
	var instanceYaml *SettingParamater
	buf, err := ioutil.ReadFile(yamlPath)
	if err != nil {
		fmt.Println(err)
	}

	instanceYaml = &SettingParamater{}
	err = yaml.Unmarshal(buf, instanceYaml)
	if err != nil {
		panic(err)
	}
}
