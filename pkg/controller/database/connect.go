package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func InitDatabase() *sql.DB {
	username := "root"
	password := "root"
	hostname := "mysql:3306"

	auth := username + ":" + password + "@tcp(" + hostname + ")/JUDGELIGHT"
	db, err := sql.Open("mysql", auth)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	return db
}

func EndDatabase(db *sql.DB) {
	db.Close()
}
