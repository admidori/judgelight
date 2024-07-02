package database

import (
	"fmt"
)

type Result_table struct {
	Student_id  string
	Problem_num int
	Result int
}

func ReadResult() []Result_table {
	db := InitDatabase()

	rows, err := db.Query(`SELECT * FROM JUDGELIGHT.RESULT`)
	if err != nil {
		fmt.Print(err)
	}

	var res []Result_table
	for rows.Next() {
		var username string
		var problem_num int
		var result int
		err := rows.Scan(&username, &problem_num, &result)
		if err != nil {
			fmt.Print(err)
		}
		res = append(res, Result_table{Student_id: username, Problem_num: problem_num, Result: result})
	}

	EndDatabase(db)
	return res
}
