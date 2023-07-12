package settings

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

func MarshallYaml(schema SettingParamater) {
	buf, err := yaml.Marshal(&schema)
	if err != nil {
		fmt.Print(err)
	}
	
	f, er := os.Open(Yamlpath)
	if er != nil {
		fmt.Print(er)
	}

	_, e := f.Write(buf)
	if e != nil {
		fmt.Print(e)
	}

	defer f.Close()
}
