package database

import "log"

func DeleteContest() {
	db := InitDatabase()

	result, err := db.Exec(`DELETE FROM JUDGELIGHT.CONTEST`)
	if err != nil {
		panic(err)
	}
	log.Print(result)

	EndDatabase(db)
}
