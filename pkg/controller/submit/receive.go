package submit

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Receiveprogramformat struct {
	Data      string `json:"data"`
	DataID    string `json:"dataID"`
	ProblemID string `json:"problemID"`
	AuthorID  string `json:"authorID"`
	Language  string `json:"language"`
}

func ReceiveSubmitProgram(c *gin.Context) {
	var json Receiveprogramformat
	c.BindJSON(&json)

	BuildDockerfile(json.Language)
	statusCode := ContainerCreateAndStart(json.DataID, json.ProblemID, json.Language)

	switch statusCode {
	// AC
	case 0:
		c.JSON(http.StatusOK, gin.H{
			"DataID":       json.DataID,
			"AuthorID":     json.AuthorID,
			"ResultStatus": "AC",
		})
	// WA
	case 1:
		c.JSON(http.StatusOK, gin.H{
			"DataID":       json.DataID,
			"AuthorID":     json.AuthorID,
			"ResultStatus": "WA",
		})
	// CE
	case 2:
		c.JSON(http.StatusOK, gin.H{
			"DataID":       json.DataID,
			"AuthorID":     json.AuthorID,
			"ResultStatus": "CE",
		})
	// TLE
	case 3:
		c.JSON(http.StatusOK, gin.H{
			"DataID":       json.DataID,
			"AuthorID":     json.AuthorID,
			"ResultStatus": "TLE",
		})
	}
}
