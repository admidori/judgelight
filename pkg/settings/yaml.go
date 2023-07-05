package settings

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

func Unmarshal_yaml(yamlPath string) {
	file, err := os.Open(yamlPath)
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	yaml.Decoder()
}
