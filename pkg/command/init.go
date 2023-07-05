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

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Init YAML files and delete problemset.",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Print("Init problemset? [y/n] -> ")
		var ans string
		fmt.Scan(&ans)
		if ans == "y" || ans == "Y" {
			err := exec.Command("sh","../../pkg/command/template/init.sh").Run()
			if err != nil {
				panic(err)
			}
			fmt.Println("Complete init!")
		} else {
			os.Exit(0)
		}
	},
}

func init() {
	setCmd.AddCommand(initCmd)
}
