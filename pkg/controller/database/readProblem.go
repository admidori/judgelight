package database

import (
	"encoding/json"
	"fmt"
)

type Problem_table struct {
	ProblemNum              string
	ProblemTitle            string
	ProblemScore            int
	ProblemLimitTime        int
	ProblemLimitMemory      int
	ProblemDescription      string
	ProblemLimitationInput  string
	ProblemLimitationOutput string
	ProblemInitialCode      string

	TestCase   []Case
	SecretCase []Case
}

type Case struct {
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
		var input_description string
		var output_description string
		var initialCode string
		var testcase []byte
		var secretcase []byte

		err := rows.Scan(&id, &title, &score, &limitTime, &limitMemory, &problem_description, &input_description, &output_description, &initialCode, &testcase, &secretcase)
		if err != nil {
			panic(err)
		}
		var testcaseSlice []Case
		var secretcaseSlice []Case
		if err := json.Unmarshal(testcase, &testcaseSlice); err != nil {
			panic(err)
		}
		if err := json.Unmarshal(secretcase, &secretcaseSlice); err != nil {
			panic(err)
		}
		result = append(result, Problem_table{ProblemNum: id, ProblemTitle: title, ProblemScore: score, ProblemLimitTime: limitTime, ProblemLimitMemory: limitMemory, ProblemDescription: problem_description, ProblemLimitationInput: input_description, ProblemLimitationOutput: output_description, ProblemInitialCode: initialCode, TestCase: testcaseSlice, SecretCase: secretcaseSlice})
	}
	EndDatabase(db)
	return result
}
