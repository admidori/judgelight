package api

import (
	"net/http"
	"strings"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/gin-gonic/gin"
)

type ReceiveLoginFormat struct {
	Student_id string `json:"student_id"`
	Password   string `json:"password"`
}

func Login(c *gin.Context) {
	var json ReceiveLoginFormat
	c.BindJSON(&json)

	userTable := database.ReadUser()
	loginStatusCode := judgeuser(json.Student_id, json.Password, userTable)

	switch loginStatusCode {
	case 1:
		c.JSON(http.StatusOK, gin.H{
			"status": "success",
		})

	case -1:
		c.JSON(http.StatusOK, gin.H{
			"status": "failed",
		})
	}
}

func judgeuser(student_id string, password string, userTable []database.User_table) int {
	for _, user := range userTable {
		dbid := strings.Join(user.Student_id, "")
		dbpass := strings.Join(user.Student_password, "")
		if student_id == dbid && password == dbpass {
			return 1
		}
	}
	return -1
}
