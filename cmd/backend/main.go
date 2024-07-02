/*
Copyright © 2024 Aoi Kondo <agotadmidori@gmail.com>
*/

package main

import (
	"github.com/admidori/judgelight/pkg/controller/api"
	"github.com/admidori/judgelight/pkg/controller/submit"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	
	router.POST("/program/submit", submit.ReceiveSubmitProgram)
	router.POST("/program/submit/result", api.RegisterResult)
	router.POST("/register/login", api.Login)
	router.GET("/get/problem/info", api.GetProblemInfo)
	router.GET("/get/contest/info", api.GetContestInfo)
	router.GET("/database/result", api.GetResultInfo)

	// Start listening.
	router.Run(":8080")
}
