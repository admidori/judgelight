/*
Copyright © 2024 Aoi Kondo <agotadmidori@gmail.com>
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
var contest_flag bool

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
				fmt.Println("[", cnt, "]\t", user.Student_id, "\t", user.Student_password)
				cnt++
			}
			return nil
		}
		if problem_flag {
			fmt.Println("problem table")
			problem := database.ReadProblem()

			var cnt int = 1
			for _, prob := range problem {
				fmt.Println("[", cnt, "]\t", prob.ProblemNum, "\t", prob.ProblemTitle, "\t", prob.ProblemScore, "\t", prob.ProblemLimitTime, "\t", prob.ProblemLimitMemory, "\t", prob.ProblemDescription, "\t", prob.ProblemLimitationInput, "\t", prob.ProblemLimitationOutput, "\t", prob.ProblemInitialCode, "\t", prob.TestCase, "\t", prob.SecretCase)
				cnt++
			}
			return nil
		}
		if submit_flag {
			fmt.Println("submit table")
			return nil
		}
		if contest_flag {
			fmt.Println("contest table")
			return nil
		}
		return fmt.Errorf("please select the flag")
	},
}

func init() {
	rootCmd.AddCommand(infoCmd)

	infoCmd.Flags().BoolVarP(&user_flag, "user", "u", false, "Show user table")
	infoCmd.Flags().BoolVarP(&problem_flag, "problem", "p", false, "Show problem table")
	infoCmd.Flags().BoolVarP(&submit_flag, "submit", "s", false, "Show submit table")
	infoCmd.Flags().BoolVarP(&contest_flag, "contest", "c", false, "Show contest table")
}
