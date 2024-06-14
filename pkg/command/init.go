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
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if init_problem {
			database.DeleteProblem()
			fmt.Print("Initializing problem table")
		}
		if init_result {
			database.DeleteResult()
			fmt.Println("Initializing result table")
		}
		if !init_problem && !init_result {
			return fmt.Errorf("please select the table to initialize")
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	initCmd.Flags().BoolVarP(&init_problem, "problem", "p", false, "Initialize problem table")
	initCmd.Flags().BoolVarP(&init_result, "result", "r", false, "Initialize result table")
}
