/*
Copyright © 2024 Aoi Kondo <agotadmidori@gmail.com>
*/
package cmd

import (
	"fmt"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/admidori/judgelight/pkg/controller/settings"
	"github.com/spf13/cobra"
)

var file_problem string
var info bool

// setCmd represents the set command
var setCmd = &cobra.Command{
	Use:   "set",
	Short: "Set the problem and contest information to the file.",
	Long: `Set the problem and contest information to the file.
		You can set the problem and contest information to the file by using this command.
		For example, if you want to set the problem and contest information to the file, use the following command:
			judgelight set -f <filepath>

		If you want to get more information about the format of the file, use the following command:
			judgelight set -i
		`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if info {
			fmt.Println("The format of the file should be as follows:")
			fmt.Println("contest:")
			fmt.Println("  contest_id: <contest_id>")
			fmt.Println("  contest_name: <contest_name>")
			fmt.Println("  start_time: <start_time>")
			fmt.Println("  end_time: <end_time>")
			fmt.Println("  problems:")
			fmt.Println("    - problem_id: <problem_id>")
			fmt.Println("      problem_name: <problem_name>")
			fmt.Println("      testcase: <testcase>")
			fmt.Println("      secretcase: <secretcase>")
			return nil
		}
		if file_problem == "" {
			return fmt.Errorf("please provide a file")
		}
		if file_problem != "" {
			var schema settings.Problems
			settings.UnmarshalYamlProblem(&schema, file_problem)
			database.RegisterProblem(schema)
			fmt.Println("The problem and contest information has been set to the file.")
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(setCmd)

	setCmd.Flags().StringVarP(&file_problem, "file", "f", "", "file to set")
	setCmd.Flags().BoolVarP(&info, "info", "i", false, "get more information about the format of the file")
}
