package database

import (
	"fmt"
)

type User_table struct {
	Username []string
	Password []string
}

func ReadUser() []User_table {
	db := InitDatabase()

	rows, err := db.Query(`SELECT * FROM JUDGELIGHT.USER`)
	if err != nil {
		fmt.Print(err)
	}

	var result []User_table
	for rows.Next() {
		var username string
		var password string
		err := rows.Scan(&username, &password)
		if err != nil {
			fmt.Print(err)
		}
		result = append(result, User_table{Username: []string{username}, Password: []string{password}})
	}

	EndDatabase(db)
	return result
}
