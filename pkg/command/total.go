/*
Copyright © 2024 Aoi Kondo <agotadmidori@gmail.com>
*/
package cmd

import (
	"os"
	"strconv"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/spf13/cobra"
)

var fileTotal string

// totalCmd represents the total command
var totalCmd = &cobra.Command{
	Use:   "total",
	Short: "A tolal command to calculate total of all the marks of a student and export it to a file.",
	Long:  `This command is used to calculate the total of all the marks of a student and export it to a file.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		dbResult := database.ReadResult()

		file, err := os.Create(fileTotal)
		if err != nil {
			panic(err)
		}
	
		for _, res := range dbResult {
			var answer string
			switch res.Result {
			case 0:
				answer = "AC"
			case 1:
				answer = "WA"
			case 2:
				answer = "CE"
			case 3:
				answer = "TLE"
			}
	
			str := res.Student_id + "," + strconv.Itoa(res.Problem_num) + "," + answer + "\n"
			data := []byte(str)
			_, err := file.Write(data)
			if err != nil {
				panic(err)
			}
			
			defer file.Close()
		}
	return nil
	},
}

func init() {
	rootCmd.AddCommand(totalCmd)

	totalCmd.Flags().StringVarP(&fileTotal, "file", "f", "", "Output the result to a Excel file")
}
