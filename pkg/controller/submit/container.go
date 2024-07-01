package submit

import (
	"context"
	j "encoding/json"
	"fmt"
	"path/filepath"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
)

type case_struct struct {
	Input  string
	Output string
}

func ContainerCreateAndStart(json Receiveprogramformat) int {
	ctx := context.Background()

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}
	cli.NegotiateAPIVersion(ctx)

	var testcaseJson []case_struct
	for i := 0; i < len(json.TestCaseInput); i++ {
		testcaseJson = append(testcaseJson, case_struct{Input: json.TestCaseInput[i], Output: json.TestCaseOutput[i]})
	}
	outputTestJson, err := j.Marshal(&testcaseJson)
	if err != nil {
		panic(err)
	}

	var secretcaseJson []case_struct
	for i := 0; i < len(json.SecretCaseInput); i++ {
		secretcaseJson = append(secretcaseJson, case_struct{Input: json.SecretCaseInput[i], Output: json.SecretCaseOutput[i]})
	}
	outputSecretJson, err := j.Marshal(&secretcaseJson)
	if err != nil {
		panic(err)
	}

	imagefilename := "judge-server:" + json.Language
	envvalue1 := "SUBMITFILENAME=" + json.AuthorID
	envvalue2 := "SUBMITLANGUAGE=" + json.Language
	envvalue3 := "DATA=" + json.Data
	envvalue4 := "TESTCASEJSON=" + string(outputTestJson)
	envvalue5 := "SECRETCASEJSON=" + string(outputSecretJson)

	absolutePath, err := filepath.Abs("../../docker/language/c/")
	if err != nil {
		panic(err)
	}
	sourcepath := absolutePath + "/"

	resp, err := cli.ContainerCreate(
		ctx,
		&container.Config{
			Image: imagefilename,
			Cmd:   []string{},
			Env:   []string{envvalue1, envvalue2, envvalue3, envvalue4, envvalue5},
			Tty:   false,
		}, &container.HostConfig{
			Mounts: []mount.Mount{
				{
					Type:   mount.TypeBind,
					Source: sourcepath,
					Target: "/workspace",
				},
			},
		}, nil, nil, "")
	if err != nil {
		panic(err)
	}

	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}

	var exitCode container.WaitResponse
	exitCodeCh, errch := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errch:
		if err != nil {
			panic(err)
		}
	case exitCode = <-exitCodeCh:
		// End Process - Remove container
		err = cli.ContainerRemove(ctx, resp.ID, types.ContainerRemoveOptions{})
		if err != nil {
			panic(err)
		}

		//WA
		if exitCode.StatusCode == 1 {
			fmt.Println("WA")
		}
		//CE
		if exitCode.StatusCode == 2 {
			fmt.Println("CE")
		}
		//AC
		if exitCode.StatusCode == 0 {
			fmt.Println("AC")
		}
	}
	return (int(exitCode.StatusCode))
}
