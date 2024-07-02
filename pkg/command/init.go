/*
Copyright © 2024 Aoi Kondo <agotadmidori@gmail.com>
*/
package cmd

import (
	"fmt"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/spf13/cobra"
)

var init_problem bool
var init_result bool
var init_user bool

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initialize the database table.",
	Long: `This command is used to initialize the database table.
	If you want to initialize the problem table, use the -p flag.
	If you want to initialize the result table, use the -r flag.
	If you want to initialize the user table, use the -u flag.
	If you want to initialize all table, use the -a flag.
	You can use both flags at the same time.
	For example, if you want to initialize the problem table and the result table, use the following command:
		judgelight init -p -r
	`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if init_problem {
			database.DeleteProblem()
			fmt.Println("Problem table initialized successfully.")
		}
		if init_result {
			database.DeleteResult()
			fmt.Println("Result table initialized successfully.")
		}
		if init_user {
			database.DeleteUser()
			fmt.Println("User table initialized successfully.")
		}else{
			return fmt.Errorf("please select the table to initialize")
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	initCmd.Flags().BoolVarP(&init_problem, "problem", "p", false, "Initialize problem table")
	initCmd.Flags().BoolVarP(&init_result, "result", "r", false, "Initialize result table")
	initCmd.Flags().BoolVarP(&init_user, "user", "u", false, "Initialize user table")
	initCmd.Flags().BoolVarP(&init_user, "all", "a", false, "Initialize all table")
}
