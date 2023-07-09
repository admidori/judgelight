package settings

var path = "../../settings/setting.yaml"

func SetSettingParamater(m *map[interface{}]interface{}) {
	UnmarshalYAML(path, m)
}
