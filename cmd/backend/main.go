/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

/*
Function: This is backend program for judgelight.
		  Receive "Submit datafile" from axios on React(Next.js).
		  And send a json file to judge-language server.
*/

package main

import (
	"github.com/admidori/judgelight/pkg/controller/database"
	"github.com/admidori/judgelight/pkg/controller/paramater"
	"github.com/admidori/judgelight/pkg/controller/problem"
	"github.com/admidori/judgelight/pkg/controller/submit"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	// If submit programs, excute below.
	router.POST("/program/submit", submit.ReceiveSubmitProgram)
	router.GET("/paramater", paramater.SendParamater)
	router.GET("/problem", problem.SendProblem)

	// If register user, excute below.
	router.POST("/register/problem", database.RegisterProblem)

	// Start listening.
	router.Run(":8080")
}
