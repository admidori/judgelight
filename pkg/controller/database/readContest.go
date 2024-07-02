package database

import (
	"fmt"
)

type Contest_table struct {
	Title      string
	Start_time string
	End_time   string
}

func ReadContest() Contest_table {
	db := InitDatabase()

	var res Contest_table
	var title string
	var start_time string
	var end_time string

	if err := db.QueryRow(`SELECT * FROM JUDGELIGHT.CONTEST`).Scan(&title, &start_time, &end_time); err != nil {
		fmt.Print(err)
	}
	res.Title = title
	res.Start_time = start_time
	res.End_time = end_time

	EndDatabase(db)
	return res
}
