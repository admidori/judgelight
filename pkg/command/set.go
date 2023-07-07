/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/rp-agota/judgelight/pkg/settings"
	"github.com/spf13/cobra"
)

// setCmd represents the set command
var setCmd = &cobra.Command{
	Use:   "set",
	Short: "Read yaml file and setup problemset",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		settings.SetSettings()
	},
}

func init() {
	rootCmd.AddCommand(setCmd)
}
