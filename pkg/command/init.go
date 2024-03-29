/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"
	"os/exec"
	"strconv"

	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Init YAML files and delete problemset.",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		var ans string

		fmt.Println("[Warning] This commad reset problems and settings.")
		fmt.Print("Init problemset? [y/n] -> ")
		fmt.Scan(&ans)
		if ans == "y" || ans == "Y" {
			err := exec.Command("sh", "../../pkg/command/scripts/init.sh").Run()
			if err != nil {
				panic(err)
			}

			fmt.Print("How many problems do you set? ->")
			fmt.Scan(&ans)
			problemNum, _ := strconv.Atoi(ans)
			createDirectoryandFiles(problemNum)

			fmt.Println("Complete init!")
			os.Exit(0)
		} else {
			fmt.Println("Canceled.")
			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
}

func createDirectoryandFiles(num int) {
	file, err := os.Lstat("../../settings/")
	if err != nil {
		fmt.Print(err)
	}
	fileMode := file.Mode()
	unixPerms := fileMode & os.ModePerm

	// Create directory
	for i := 0; i < num; i++ {
		dirName := "../../settings/case/" + strconv.Itoa(i+1) + "/examplecase"
		err := os.MkdirAll(dirName, unixPerms)
		if err != nil {
			panic(err)
		}
		
		dirName = "../../settings/case/" + strconv.Itoa(i+1)
		_, err = os.Create(dirName+"/problem.txt")
		if err != nil {
			panic(err)
		}

		dirName = "../../settings/case/" + strconv.Itoa(i+1) + "/testcase"
		err = os.MkdirAll(dirName, unixPerms)
		if err != nil {
			panic(err)
		}
	}

}
