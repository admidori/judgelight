package submit

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Receiveprogramformat struct {
	Data             string   `json:"data"`
	DataID           string   `json:"dataID"`
	AuthorID         string   `json:"authorID"`
	Language         string   `json:"language"`
	TestCaseInput    []string `json:"testCaseInput"`
	TestCaseOutput   []string `json:"testCaseOutput"`
	SecretCaseInput  []string `json:"secretCaseInput"`
	SecretCaseOutput []string `json:"secretCaseOutput"`
}

func ReceiveSubmitProgram(c *gin.Context) {
	var json Receiveprogramformat
	err := c.BindJSON(&json)
	if err != nil {
		panic(err)
	}
	BuildDockerfile(json.Language)
	statusCode := ContainerCreateAndStart(json)

	switch statusCode {
	// AC
	case 0:
		c.JSON(http.StatusOK, gin.H{
			"DataID":           json.DataID,
			"AuthorID":         json.AuthorID,
			"ResultStatus":     "AC",
			"ResultStatusCode": 0,
		})
	// WA
	case 1:
		c.JSON(http.StatusOK, gin.H{
			"DataID":           json.DataID,
			"AuthorID":         json.AuthorID,
			"ResultStatus":     "WA",
			"ResultStatusCode": 1,
		})
	// CE
	case 2:
		c.JSON(http.StatusOK, gin.H{
			"DataID":           json.DataID,
			"AuthorID":         json.AuthorID,
			"ResultStatus":     "CE",
			"ResultStatusCode": 2,
		})
	// TLE
	case 3:
		c.JSON(http.StatusOK, gin.H{
			"DataID":           json.DataID,
			"AuthorID":         json.AuthorID,
			"ResultStatus":     "TLE",
			"ResultStatusCode": 3,
		})
	}
}
