/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/spf13/cobra"
)

var problemCmd = &cobra.Command{
	Use:   "problem",
	Short: "Set problem following to settings directory",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {

	},
}

func init() {
	setCmd.AddCommand(problemCmd)
}