package database

import (
	"database/sql"
	"fmt"
)

func InitDatabase() {
	username := "root"
	password := "root"
	hostname := "localhost:3306"

	auth := username + ":" + password + "@(" + hostname + ")/judgelight"
	db, err := sql.Open("mysql", auth)
	if err != nil {
		fmt.Print(err)
	}

	err = db.Ping()
}
