package settings

var path = "../../settings/setting.yaml"

func SetSettings() {
	UnmarshalYAML(path)
}

