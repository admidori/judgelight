package settings

// Expand YAML file and defile values

type ContestInformation struct {
	ContestName         string `yaml:"contest-name"`
	NumberOfParticipant int    `yaml:"number-of-participant"`
}

type ProblemInformation struct {
	NumberOfProblem int `yaml:"number-of-problem"`
	LimitTime       int `yaml:"limit-time"`
}

type Admininformation struct {
	Hostname string `yaml:"hostname"`
}

type SettingParamater struct {
	ContestInformation `yaml:"contest-information"`
	ProblemInformation `yaml:"problem-information"`
	Admininformation   `yaml:"admin-information"`
}
