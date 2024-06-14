package database

import "log"

func DeleteResult() {
	db := InitDatabase()

	result, err := db.Exec(`DELETE FROM JUDGELIGHT.RESULT`)
	if err != nil {
		panic(err)
	}

	log.Print(result)

	EndDatabase(db)
}
