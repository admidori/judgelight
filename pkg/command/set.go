/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

// setCmd represents the set command
var setCmd = &cobra.Command{
	Use:   "set",
	Short: "",
	Long: ``,
	Run: func(cmd *cobra.Command, args []string) {
		var ans string
		fmt.Print("Set problems?[y/n]-> ")
		fmt.Scan(&ans)
		if ans == "y" || ans == "Y" {
			err := exec.Command("sh", "../../pkg/command/scripts/problemset.sh").Run()
			if err != nil {
				panic(err)
			}
			fmt.Print("Complite setting problems.")
			os.Exit(0)
		} else {
			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(setCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// setCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// setCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
