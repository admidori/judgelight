package submit

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/docker"
)

type Receiveprogramformat struct {
	Data     string `json:"data"`
	DataID   string `json:"dataID"`
	AuthorID string `json:"authorID"`
	Language string `json:"language"`
}

func ReceiveSubmitProgram(c *gin.Context) {
	var json Receiveprogramformat
	c.BindJSON(&json)
	c.JSON(http.StatusOK, gin.H{"status": "OK"})

	createsubmitfile(json)
	docker.BuildDockerfile(json.Language)
	docker.ContainerCreateAndStart(json.DataID, json.Language)

	c.JSON(http.StatusCreated, gin.H{
		"status": "ok",
	})
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
