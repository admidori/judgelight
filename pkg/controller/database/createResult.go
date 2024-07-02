package database

import "fmt"

func CreateResult() {
	db := InitDatabase()

	stmt, err := db.Prepare(`INSERT INTO JUDGELIGHT.RESULT (RESULT) VALUES (JSON_OBJECT(problem_id , ? , judge , ?))`)
	if err != nil {
		fmt.Print(err)
	}
	result, err := stmt.Exec()
	if err != nil {
		fmt.Print(err)
	}
	fmt.Print(result)

	EndDatabase(db)
}
