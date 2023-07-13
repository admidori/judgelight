package paramater

import (
	"github.com/gin-gonic/gin"
	"github.com/rp-agota/judgelight/pkg/settings"
)

func SendParamater(c *gin.Context) {
	var schema settings.SettingParamater

	settings.UnmarshalYAML(schema)

}
