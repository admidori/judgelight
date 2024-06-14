/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/spf13/cobra"
)

var user_flag bool
var problem_flag bool
var submit_flag bool

// infoCmd represents the info command
var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if user_flag {
			fmt.Println("NUMBER" + "\t" + "USERNAME" + "\t" + "PASSWORD")
			user_result := database.ReadUser()

			var cnt int = 1
			for _, user := range user_result {
				fmt.Println("[", cnt, "]\t", user.Username, "\t", user.Password)
				cnt++
			}
			return nil
		}
		if problem_flag {
			fmt.Println("problem table")
			return nil
		}
		if submit_flag {
			fmt.Println("submit table")
		}

		return fmt.Errorf("please select the flag")
	},
}

func init() {
	rootCmd.AddCommand(infoCmd)

	infoCmd.Flags().BoolVarP(&user_flag, "user", "u", false, "Show user table")
	infoCmd.Flags().BoolVarP(&problem_flag, "problem", "p", false, "Show problem table")
	infoCmd.Flags().BoolVarP(&submit_flag, "submit", "s", false, "Show submit table")
}
