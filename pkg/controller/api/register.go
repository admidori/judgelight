package api

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/gin-gonic/gin"
)

type ReceiveLoginFormat struct {
	Student_id string `json:"student_id"`
	Password   string `json:"password"`
}

type ReceiveRegisterFormat struct {
	Student_id string `json:"studentId"`
	ProblemNum int    `json:"problemNum"`
	Result     int    `json:"resultStatusCode"`
}

func Login(c *gin.Context) {
	var json ReceiveLoginFormat
	err := c.BindJSON(&json)
	if err != nil {
		panic(err)
	}
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

func RegisterResult(c *gin.Context) {
	var json ReceiveRegisterFormat
	var table database.Result_table

	err := c.BindJSON(&json)
	if err != nil {
		panic(err)
	}

	table.Student_id = json.Student_id
	table.Problem_num = json.ProblemNum
	table.Result = json.Result
	fmt.Print(table.Problem_num)
	database.RegisterResult(table)

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}
