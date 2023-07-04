/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

package cmd

import (
	"fmt"

	"github.com/rp-agota/judgelight/pkg/etc"
	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Show the judgelight version and copyright information",
	Long: ``,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("judgelight version -- " + etc.VERSION_JUDGELIGHT + " (" + etc.DEVELOPMENT_CODE + ")")
		fmt.Println("Release: " + etc.RELEASE_DATE)
		fmt.Println("Copyright (c) 2023 Aoi Kondo (rp-agota) All Rights Reserved.")
		fmt.Println("Github Repository: https://github.com/rp-agota/judgelight")
		fmt.Println("Contact author: agotadmidori@gmail.com")
		fmt.Println("This project is licensed under the MIT License, see the LICENSE file for details.")
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)
}
