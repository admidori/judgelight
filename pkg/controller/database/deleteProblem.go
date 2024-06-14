package database

import "fmt"

func DeleteProblem() {
	db := InitDatabase()

	result, err := db.Exec(`DELETE FROM JUDGELIGHT.PROBLEM`)
	if err != nil {
		fmt.Print(err)
	}
	fmt.Print(result)

	EndDatabase(db)
}
