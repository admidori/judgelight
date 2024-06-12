package problem

import (
	"os"
)

func GetProblem(num string) string {
	filename := "../../settings/case/" + num + "/problem.txt"
	file, err := os.ReadFile(filename)
	if err != nil {
		panic(err)
	}

	return string(file)
}
