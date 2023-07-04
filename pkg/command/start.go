/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

package cmd

import (
	"github.com/spf13/cobra"
)

var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Run judgelight programs",
	Long: `Run judgelight programs on docker container.
	After excute command, Run docker compose and start nginx and api containers.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Exec docker compose up
	},
}

func init() {
	rootCmd.AddCommand(startCmd)
}
