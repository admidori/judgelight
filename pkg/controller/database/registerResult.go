package database

import (
	"fmt"
)

func RegisterResult(res Result_table) {
	db := InitDatabase()
	
	stmt, err := db.Prepare(`INSERT INTO JUDGELIGHT.RESULT (STUDENT_ID, PROBLEM_ID, RESULT) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE RESULT = VALUES(RESULT)`)
	if err != nil {
		panic(err)
	}
	result, err := stmt.Exec(res.Student_id, res.Problem_num+1, res.Result)
	if err != nil {
		panic(err)
	}
	fmt.Print(result)

	EndDatabase(db)
}
