package submit

import (
	"context"
	"fmt"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

func ReceiveSubmitProgram(c *gin.Context) {
	s := c.PostForm("program")
	message := fmt.Sprintf("%v", s)
	fmt.Print(message)

	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		fmt.Printf("%s %s\n", container.ID[:10], container.Image)
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": "ok",
	})
}
