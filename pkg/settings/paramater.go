package settings

// Expand YAML file and defile values

type ProblemInfomation struct {
	Name           string `yaml:"name"`
	ExampleCaseNum int    `yaml:"examplecase-num"`
	TestCaseNum    int    `yaml:"testcase-num"`
}

type SettingParamater struct {
	ContestName         string `yaml:"contest-name"`
	NumberOfParticipant int    `yaml:"number-of-participant"`
	NumberOfProblem     int    `yaml:"number-of-problem"`
	LimitTime           int    `yaml:"limit-time"`

	ProblemInfo []ProblemInfomation `yaml:"example-problem-info"`
}

var Yamlpath = "../../settings/setting.yaml"