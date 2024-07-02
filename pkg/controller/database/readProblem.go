package database

import (
	"encoding/json"
	"fmt"
)

type Problem_table struct {
	ProblemNum                   string
	ProblemTitle                 string
	ProblemScore                 int
	ProblemLimitTime             int
	ProblemLimitMemory           int
	ProblemDescription           string
	ProblemLimitationDescription string
	ProblemLimitationInput       string
	ProblemLimitationOutput      string
	ProblemInitialCode           string

	TestCase   []TCase
	SecretCase []SCase
}

type TCase struct {
	Input  string
	Output string
	Description string
}

type SCase struct {
	Input  string
	Output string
}

func ReadProblem() []Problem_table {
	db := InitDatabase()

	rows, err := db.Query(`SELECT * FROM JUDGELIGHT.PROBLEM`)
	if err != nil {
		fmt.Print(err)
	}

	var result []Problem_table
	for rows.Next() {
		var id string
		var title string
		var score int
		var limitTime int
		var limitMemory int
		var problem_description string
		var problem_limitation_description string
		var input_description string
		var output_description string
		var initialCode string
		var testcase []byte
		var secretcase []byte

		err := rows.Scan(&id, &title, &score, &limitTime, &limitMemory, &problem_description, &problem_limitation_description, &input_description, &output_description, &initialCode, &testcase, &secretcase)
		if err != nil {
			panic(err)
		}
		var testcaseSlice []TCase
		var secretcaseSlice []SCase
		if testcase == nil {
			testcaseSlice = nil
		} else {
			if err := json.Unmarshal(testcase, &testcaseSlice); err != nil {
				panic(err)
			}
		}
		if err := json.Unmarshal(secretcase, &secretcaseSlice); err != nil {
			panic(err)
		}
		result = append(result, Problem_table{ProblemNum: id, ProblemTitle: title, ProblemScore: score, ProblemLimitTime: limitTime, ProblemLimitMemory: limitMemory, ProblemDescription: problem_description, ProblemLimitationDescription: problem_limitation_description, ProblemLimitationInput: input_description, ProblemLimitationOutput: output_description, ProblemInitialCode: initialCode, TestCase: testcaseSlice, SecretCase: secretcaseSlice})
	}
	EndDatabase(db)
	return result
}
