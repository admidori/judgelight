/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// setCmd represents the set command
var setCmd = &cobra.Command{
	Use:   "set",
	Short: "Set command apply to problems and other settings.",
	Long: `Set command is collection of setting about problems and other setting in judgelight.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Usage: judgelight set [OPTIONS] COMMAND")
		fmt.Println("Set command apply to problems and other settings.")
		fmt.Println()
		fmt.Println("Commands:")
		fmt.Println("	problem			Read yaml file and setup problemset")
		fmt.Println(" 	init 			Init problemset")	
	},
}

func init() {
	rootCmd.AddCommand(setCmd)
}
