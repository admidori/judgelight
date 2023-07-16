package submit

import (
	"fmt"
	"net/http"
	"os"

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

	createsubmitfile(json)
	BuildDockerfile(json.Language)
	statusCode := ContainerCreateAndStart(json.DataID, json.ProblemID, json.Language)

	switch statusCode {
	// AC
	case 0:
		writeFile(json.AuthorID, json.ProblemID)

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
	}
}

func createsubmitfile(json Receiveprogramformat) {
	filename := json.DataID + "." + json.Language
	filepath := "../../docker/language/" + json.Language + "/work/src/" + filename
	f, err := os.Create(filepath)
	if err != nil {
		panic(err)
	}
	if _, err = f.Write([]byte(json.Data)); err != nil {
		panic(err)
	}
	defer f.Close()
}

func writeFile(authorID string, problemID string) {
	fileName := "../../result/"+ authorID + ".csv"
	writeData := problemID + "," + "AC"

	file, err := os.OpenFile(fileName, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Print(err)
	}
	defer file.Close()

	fmt.Fprintln(file, writeData)
}
