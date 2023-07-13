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
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/controller/paramater"
	"github.com/rp-agota/judgelight/pkg/controller/problem"
	"github.com/rp-agota/judgelight/pkg/controller/submit"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"http://localhost:3030",
		},
		// If use HTTP method, change below.
		AllowMethods: []string{
			"POST",
			"GET",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		AllowCredentials: false,
	}))

	// If submit programs, excute below.
	router.POST("/program/submit", submit.ReceiveSubmitProgram)
	router.GET("/paramater", paramater.SendParamater)
	router.GET("/problem", problem.SendProblem)

	// Start listening.
	router.Run(":8080")
}
