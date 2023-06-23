/*
Copyright © 2023 Aoi Kondo <agotadmidori@gmail.com>
*/

package main

import "github.com/gin-gonic/gin"

func setupRouter() *gin.Engine {
  r := gin.Default()
  r.GET("/program", func(c *gin.Context) {
    c.String(200, "pong")
  })
  return r
}

func main() {
  r := setupRouter()
  r.Run(":8080")
}