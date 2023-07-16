package database

import (
	"database/sql"
	"fmt"
)

func InitDatabase() {
	username := "test"
	password := "test"
	hostname := "localhost:3306"

	var err error
	auth := username + ":" + password + "@(" + hostname + ")/JUDGELIGHT"
	db, err := sql.Open("mysql", auth)
	if err != nil {
		fmt.Print(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
}
