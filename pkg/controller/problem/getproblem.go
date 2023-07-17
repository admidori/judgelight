package problem

import (
	"io/ioutil"
)

func GetProblem(num string) string {
	filename := "../../docker/language/c/work/src/case/" + num + "/problem.txt"
	file, err := ioutil.ReadFile(filename)
	if err != nil {
		panic(err)
	}

	return string(file)
}
