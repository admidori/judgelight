/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"encoding/csv"
	"fmt"
	"os"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/spf13/cobra"
)

var file string
var student_id string
var student_password string

// registerCmd represents the register command
var registerCmd = &cobra.Command{
	Use:   "register",
	Short: "Register a user to the database.",
	Long: `This command is used to register a user to the database.
	If you want to register a single user, use the -u and -p flags.
	If you want to register multiple users, use the -f flag to provide a CSV file.
	For example, if you want to register a single user, use the following command:
		judgelight register -u <username> -p <password>
	If you want to register multiple users, use the following command:
		judgelight register -f <file>
	The CSV file should have the following format:
		<username1>,<password1>
		<username2>,<password2>
		...
		<usernameN>,<passwordN>
		`,

	RunE: func(cmd *cobra.Command, args []string) error {
		if file == "" {
			if student_id == "" || student_password == "" {
				return fmt.Errorf("please provide a file or id and password")
			}
			if len(student_id) > 5 {
				return fmt.Errorf("student_id should be less than 5 characters")
			}
			if len(student_password) > 10 {
				return fmt.Errorf("student_password should be less than 10 characters")
			}
			database.RegisterUser(student_id, student_password)
			fmt.Println("User registered successfully")
		} else {
			if student_id != "" || student_password != "" {
				return fmt.Errorf("please provide either a file or id and password")
			} else {
				csvFile, err := os.Open(file)
				if err != nil {
					return fmt.Errorf("%v", err)
				}
				defer csvFile.Close()
				r := csv.NewReader(csvFile)
				for {
					record, err := r.Read()
					if err != nil {
						break
					}
					database.RegisterUser(record[0], record[1])
				}
				fmt.Println("Data imported successfully.")
			}
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(registerCmd)

	registerCmd.Flags().StringVarP(&file, "file", "f", "", "CSV file to import")
	registerCmd.Flags().StringVarP(&student_id, "username", "u", "", "Username to register")
	registerCmd.Flags().StringVarP(&student_password, "password", "p", "", "Password to register")
}
