/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/spf13/cobra"
)

var init_problem bool
var init_result bool

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initialize the database table.",
	Long: `This command is used to initialize the database table.
	If you want to initialize the problem table, use the -p flag.
	If you want to initialize the result table, use the -r flag.
	You can use both flags at the same time.
	For example, if you want to initialize the problem table and the result table, use the following command:
		judgelight init -p -r
	`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if init_problem {
			database.DeleteProblem()
		}
		if init_result {
			database.DeleteResult()
		}
		if !init_problem && !init_result {
			return fmt.Errorf("please select the table to initialize")
		}
		fmt.Println("Table initialized successfully")
		return nil
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	initCmd.Flags().BoolVarP(&init_problem, "problem", "p", false, "Initialize problem table")
	initCmd.Flags().BoolVarP(&init_result, "result", "r", false, "Initialize result table")
}
