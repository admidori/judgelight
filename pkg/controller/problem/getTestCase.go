package problem

import (
	"os"
	"strconv"
)

func GetTestcaseInput(problemNum string, num int) string {
	dirPath := "../../settings/case/" + problemNum + "/examplecase/" + strconv.Itoa(num) + "/input.txt"
	file, err := os.ReadFile(dirPath)
	if err != nil {
		panic(err)
	}

	return string(file)
}

func GetTestcaseOutput(problemNum string, num int) string {
	dirPath := "../../settings/case/" + problemNum + "/examplecase/" + strconv.Itoa(num) + "/output.txt"
	file, err := os.ReadFile(dirPath)
	if err != nil {
		panic(err)
	}

	return string(file)
}

func CheckExampleNum(num string) int {
	var cnt = 0

	for {
		dirPath := "../../settings/case/" + num + "/examplecase/" + strconv.Itoa(cnt+1)
		if f, err := os.Stat(dirPath); os.IsNotExist(err) || !f.IsDir() {
			return cnt
		} else {
			cnt++
		}
	}
}
