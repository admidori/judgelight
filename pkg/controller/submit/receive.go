package submit

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/docker"
)

type Receiveprogram struct {
	Data     string `json:"data"`
	DataID   string `json:"dataID"`
	AuthorID string `json:"authorID"`
}

func ReceiveSubmitProgram(c *gin.Context) {
	s := c.PostForm("program")
	message := fmt.Sprintf("%v", s)
	fmt.Print(message)

	fmt.Print("Send program to C-language server")
	// Todo: select language using argument.
	docker.BuildDockerfile()
	docker.ContainerCreateAndStart()

	c.JSON(http.StatusCreated, gin.H{
		"status": "ok",
	})
}
