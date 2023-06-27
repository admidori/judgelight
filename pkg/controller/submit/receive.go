package submit

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Receiveprogram struct {
	Data string `json:"name"`
	AuthorID string `json:"ID"`
}

func ReceiveSubmitProgram(c *gin.Context) {
	s := c.PostForm("program")
	message := fmt.Sprintf("%v", s)
	fmt.Print(message)

	fmt.Print("Send program to C-language server")
	

	c.JSON(http.StatusCreated, gin.H{
		"status": "ok",
	})
}
