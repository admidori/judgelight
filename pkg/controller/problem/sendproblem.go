package problem

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendProblem(c *gin.Context) {
	num := c.Query("problemNumber")
	senddata := GetProblem(num)
	c.JSON(http.StatusOK, gin.H{
		"problem": senddata,
	})
}
