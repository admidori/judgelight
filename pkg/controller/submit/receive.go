package submit

import (
	"fmt"
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
	/*
		s := c.PostForm("program")
		message := fmt.Sprintf("%v", s)
		fmt.Print(message)
	*/
	fmt.Println("dbg")
	var json Receiveprogramformat
	c.BindJSON(&json)
	c.JSON(http.StatusOK, gin.H{"status": "OK"})

	fmt.Print("Send program to C-language server")
	// Todo: select language using argument.
	createsubmitfile(json)
	docker.BuildDockerfile()
	docker.ContainerCreateAndStart()

	c.JSON(http.StatusCreated, gin.H{
		"status": "ok",
	})
}

// Todo: Rewrite for json value.
func createsubmitfile(json Receiveprogramformat) {
	filename := json.DataID + "." + json.Language
	filepath := "../../docker/language/" + json.Language + "/src/" + filename
	f, err := os.Create(filepath)
	if err != nil {
		panic(err)
	}
	if _, err = f.Write([]byte(json.Data)); err != nil {
		panic(err)
	}

	fmt.Print("excted createsubmitfile")
}
