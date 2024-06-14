package database

import "fmt"

func DeleteResult() {
	db := InitDatabase()

	stmt, err := db.Prepare(`DELETE FROM JUDGELIGHT.RESULT`)
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
