package database

import "log"

func DeleteUser() {
	db := InitDatabase()

	result, err := db.Exec(`DELETE FROM JUDGELIGHT.USER`)
	if err != nil {
		panic(err)
	}

	log.Print(result)

	EndDatabase(db)
}
