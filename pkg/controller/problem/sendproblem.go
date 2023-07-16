package problem

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendProblem(c *gin.Context) {
	num := c.Query("problemNumber")
	senddata := GetProblem(num)

	examplenumber := CheckExampleNum(num)
	exampleInput := make([]string, examplenumber)
	exampleOutput := make([]string, examplenumber)

	for i := 0; i < examplenumber; i++ {
		exampleInput[i] = GetTestcaseInput(num, i+1)
		exampleOutput[i] = GetTestcaseOutput(num, i+1)
	}

	c.JSON(http.StatusOK, gin.H{
		"problem":           senddata,
		"exampleNum":        examplenumber,
		"exampleInputData":  exampleInput,
		"exampleOutputData": exampleOutput,
	})
}
