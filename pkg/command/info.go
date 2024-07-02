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
var result_flag bool

// infoCmd represents the info command
var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "A info command to show the information of the user, problem, and result table.",
	Long: `This command will show the information of the user, problem, and result table.
		You can select the table by using the flag.
		For example, if you want to see the user table, you can use the flag --user or -u.
		You can also see the problem table by using the flag --problem or -p.
		And you can see the result table by using the flag --result or -r.
		`,
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
			fmt.Println("NUMBER" + "\t" + "PROBLEM_NUM" + "\t" + "PROBLEM_TITLE" + "\t" + "PROBLEM_SCORE" + "\t" + "PROBLEM_LIMIT_TIME" + "\t" + "PROBLEM_LIMIT_MEMORY" + "\t" + "PROBLEM_DESCRIPTION" + "\t" + "PROBLEM_LIMITATION_INPUT" + "\t" + "PROBLEM_LIMITATION_OUTPUT" + "\t" + "PROBLEM_INITIAL_CODE" + "\t" + "TESTCASE" + "\t" + "SECRETCASE")
			problem := database.ReadProblem()

			var cnt int = 1
			for _, prob := range problem {
				fmt.Println("[", cnt, "]\t", prob.ProblemNum, "\t", prob.ProblemTitle, "\t", prob.ProblemScore, "\t", prob.ProblemLimitTime, "\t", prob.ProblemLimitMemory, "\t", prob.ProblemDescription, "\t", prob.ProblemLimitationInput, "\t", prob.ProblemLimitationOutput, "\t", prob.ProblemInitialCode, "\t", prob.TestCase, "\t", prob.SecretCase)
				cnt++
			}
			return nil
		}
		if result_flag {
			fmt.Println("submit table")
			fmt.Println("STUDENT_ID" + "\t" + "PROBLEM_NUM" + "\t" + "RESULT")
			result := database.ReadResult()

			var cnt int = 1
			for _, res := range result {
				fmt.Println(res.Student_id, "\t", res.Problem_num, "\t", res.Result)
				cnt++
			}
			return nil
		}
		return fmt.Errorf("please select the flag")
	},
}

func init() {
	rootCmd.AddCommand(infoCmd)

	infoCmd.Flags().BoolVarP(&user_flag, "user", "u", false, "Show user table")
	infoCmd.Flags().BoolVarP(&problem_flag, "problem", "p", false, "Show problem table")
	infoCmd.Flags().BoolVarP(&result_flag, "result", "r", false, "Show result table")
}
