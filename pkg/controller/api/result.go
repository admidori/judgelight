package api

import (
	"net/http"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/gin-gonic/gin"
)

func GetResultInfo(c *gin.Context) {
	result := database.ReadResult()
	problem := database.ReadProblem()

	studentId := c.Query("studentId")
	problemTotalNum := len(problem)
	resultValue := make([]int, problemTotalNum)

	for i := 0; i < problemTotalNum; i++ {
		resultValue[i] = -1
	}

	for i := 0; i < len(result); i++ {
		if result[i].Student_id == studentId {
			resultValue[result[i].Problem_num-1] = result[i].Result
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"result": resultValue,
	})
}

func GetResultInfoAll(c *gin.Context) {
	result := database.ReadResult()

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}
