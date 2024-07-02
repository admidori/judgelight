package settings

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type Problem struct {
	ProblemNum                   string `yaml:"number"`
	ProblemTitle                 string `yaml:"title"`
	ProblemScore                 int    `yaml:"score"`
	ProblemLimitTime             int    `yaml:"limit_execute_time"`
	ProblemLimitMemory           int    `yaml:"limit_execute_memory"`
	ProblemDescription           string `yaml:"description"`
	ProblemInput                 string `yaml:"input_description"`
	ProblemOutput                string `yaml:"output_description"`
	ProblemInitialCode           string `yaml:"initial_code"`

	ProblemLimitationDescription []LimitDescription `yaml:"limit_description"`
	TestCase   []TCase `yaml:"testcases"`
	SecretCase []SCase `yaml:"secretcases"`
}

type LimitDescription struct {
	Description string `yaml:"description"`
}

type TCase struct {
	Input  string `yaml:"input"`
	Output string `yaml:"output"`
	Description string `yaml:"description"`
}

type SCase struct {
	Input  string `yaml:"input"`
	Output string `yaml:"output"`
}

type ContestInformation struct {
	Title     string `yaml:"title"`
	StartTime string `yaml:"start_time"`
	EndTime   string `yaml:"end_time"`
}

type Problems struct {
	ContestInfomation ContestInformation `yaml:"contest_infomation"`
	Problem           []Problem          `yaml:"problem"`
}

func MarshallYamlProblem(schema Problems, file string) {
	buf, err := yaml.Marshal(&schema)
	if err != nil {
		fmt.Print(err)
	}

	f, er := os.Open(file)
	if er != nil {
		fmt.Print(er)
	}

	_, e := f.Write(buf)
	if e != nil {
		fmt.Print(e)
	}

	defer f.Close()
}

func UnmarshalYamlProblem(schema *Problems, file string) {
	buf, err := os.ReadFile(file)
	if err != nil {
		fmt.Print(err)
	}

	if err := Parse(string(buf), &schema); err != nil {
		fmt.Print(err)
	}
}
