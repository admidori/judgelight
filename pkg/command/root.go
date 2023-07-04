/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "judgelight",
	Short: "judgelight is a tool for operating judgelight program..",
	Long: "Judgelight is a collection of programs for providing judge server for competitive-proggraming.",
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}


