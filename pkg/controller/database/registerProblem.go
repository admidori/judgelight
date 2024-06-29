package database

import (
	"fmt"
	"log"

	"github.com/admidori/judgelight/pkg/controller/settings"
)

func RegisterProblem(problem settings.Problems) {
	db := InitDatabase()

	result, err := db.Exec(`DELETE FROM JUDGELIGHT.PROBLEM`)
	if err != nil {
		panic(err)
	}
	log.Print(result)

	result, err = db.Exec(`DELETE FROM JUDGELIGHT.SETTING`)
	if err != nil {
		panic(err)
	}
	log.Print(result)

	stmt, err := db.Prepare(`INSERT INTO JUDGELIGHT.SETTING (TITLE, START_TIME, END_TIME) VALUES (?, ?, ?)`)
	if err != nil {
		panic(err)
	}
	result, err = stmt.Exec(problem.ContestInfomation.Title, problem.ContestInfomation.StartTime, problem.ContestInfomation.EndTime)
	if err != nil {
		panic(err)
	}
	log.Print(result)

	for i := 0; i < len(problem.Problem); i++ {
		stmt, err = db.Prepare(`INSERT INTO JUDGELIGHT.PROBLEM (PROBLEM_ID, PROBLEM_TITLE, PROBLEM_SCORE, LIMIT_EXECUTE_TIME, LIMIT_EXECUTE_MEMORY, PROBLEM_DESCRIPTION, INPUT_DESCRIPTION, OUTPUT_DESCRIPTION, INITIAL_CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
		if err != nil {
			panic(err)
		}
		result, err = stmt.Exec(problem.Problem[i].ProblemNum, problem.Problem[i].ProblemTitle, problem.Problem[i].ProblemScore, problem.Problem[i].ProblemLimitTime, problem.Problem[i].ProblemLimitMemory, problem.Problem[i].ProblemDescription, problem.Problem[i].ProblemInput, problem.Problem[i].ProblemOutput, problem.Problem[i].ProblemInitialCode)
		if err != nil {
			panic(err)
		}
		log.Print(result)

		for j := 0; j < len(problem.Problem[i].TestCase); j++ {
			if j > 0 {
				stmt, err = db.Prepare(`UPDATE JUDGELIGHT.PROBLEM SET TEST_CASE = JSON_ARRAY_APPEND(TEST_CASE, '$', JSON_OBJECT('input' , ? , 'output' , ?)) WHERE PROBLEM_ID = ?`)
				if err != nil {
					panic(err)
				}
				result, err = stmt.Exec(problem.Problem[i].TestCase[j].Input, problem.Problem[i].TestCase[j].Output, problem.Problem[i].ProblemNum)
				if err != nil {
					panic(err)
				}
				log.Print(result)
			} else {
				stmt, err = db.Prepare(`UPDATE JUDGELIGHT.PROBLEM SET TEST_CASE = JSON_ARRAY(JSON_OBJECT('input' , ? , 'output' , ?)) WHERE PROBLEM_ID = ?`)
				if err != nil {
					panic(err)
				}
				result, err = stmt.Exec(problem.Problem[i].TestCase[j].Input, problem.Problem[i].TestCase[j].Output, problem.Problem[i].ProblemNum)
				if err != nil {
					panic(err)
				}
				log.Print(result)
			}
		}

		for j := 0; j < len(problem.Problem[i].SecretCase); j++ {
			if j > 0 {
				stmt, err = db.Prepare(`UPDATE JUDGELIGHT.PROBLEM SET SECRET_CASE = JSON_ARRAY_APPEND(SECRET_CASE, '$', JSON_OBJECT('input' , ? , 'output' , ?)) WHERE PROBLEM_ID = ?`)
				if err != nil {
					fmt.Print(err)
				}
				result, err := stmt.Exec(problem.Problem[i].SecretCase[j].Input, problem.Problem[i].SecretCase[j].Output, problem.Problem[i].ProblemNum)
				if err != nil {
					fmt.Print(err)
				}
				log.Print(result)
			} else {
				stmt, err = db.Prepare(`UPDATE JUDGELIGHT.PROBLEM SET SECRET_CASE = JSON_ARRAY(JSON_OBJECT('input' , ? , 'output' , ?)) WHERE PROBLEM_ID = ?`)
				if err != nil {
					panic(err)
				}
				result, err = stmt.Exec(problem.Problem[i].SecretCase[j].Input, problem.Problem[i].SecretCase[j].Output, problem.Problem[i].ProblemNum)
				if err != nil {
					panic(err)
				}
				log.Print(result)
			}
		}
	}
	EndDatabase(db)
}
