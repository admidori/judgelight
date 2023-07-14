package problem

import (
	"io/ioutil"
)

func GetProblem(num string) string {
	filename := "../../settings/case/" + num + "/problem.txt"
	file, err := ioutil.ReadFile(filename)
	if err != nil {
		panic(err)
	}

	return string(file)
}
