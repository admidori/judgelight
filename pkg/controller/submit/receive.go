package submit

import (
	"net/http"
	"os"
	"os/exec"

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

	err := exec.Command("sh", "../../pkg/controller/submit/init.sh").Run()
	if(err != nil){
		panic(err)
	}
	createsubmitfile(json)
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
