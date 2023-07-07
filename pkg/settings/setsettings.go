package settings

func SetSettings() {
	path := "../../settings/setting.yaml"
	UnmarshalYAML(path)
}
