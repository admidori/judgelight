package database

import "log"

func RegisterUser(Student_id string, Student_password string) {
	db := InitDatabase()

	stmt, err := db.Prepare(`INSERT INTO JUDGELIGHT.USER (STUDENT_ID, STUDENT_PASSWORD) VALUES (?, ?)`)
	if err != nil {
		panic(err)
	}
	result, err := stmt.Exec(Student_id, Student_password)
	if err != nil {
		panic(err)
	}
	log.Print(result)

	EndDatabase(db)
}
