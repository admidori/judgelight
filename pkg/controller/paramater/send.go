package paramater

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/settings"
)

func SendParamater(c *gin.Context) {
	m := make(map[interface{}]interface{})

	settings.SetSettingParamater(&m)
	param := c.Query("paramater")

	senddata := m[param]
	c.JSON(http.StatusOK, gin.H{
		"paramater": senddata,
	})
}
