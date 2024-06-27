package api

import (
	"net/http"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/gin-gonic/gin"
)

func GetProblemInfo(c *gin.Context) {
	problem := database.ReadProblem()

	param := c.Query("paramater")
	if param == "NumberOfProblem" {
		c.JSON(http.StatusOK, gin.H{
			"paramater": len(problem),
		})
	} else {
		for _, prob := range problem {
			m := StructToMap(&prob)
			res := m[param]
			c.JSON(http.StatusOK, gin.H{
				"paramater": res,
			})
		}
	}
}

func SendProblem(c *gin.Context) {
	c.Query("paramater")
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}
