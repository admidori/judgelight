package database

import "log"

func DeleteProblem() {
	db := InitDatabase()

	result, err := db.Exec(`DELETE FROM JUDGELIGHT.PROBLEM`)
	if err != nil {
		panic(err)
	}
	log.Print(result)

	EndDatabase(db)
}
