package docker

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
)

func ContainerCreateAndStart(filename string, language string) {
	ctx := context.Background()

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}
	cli.NegotiateAPIVersion(ctx)

	imagefilename := "judge-server:" + language
	envvalue1 := "SUBMITFILENAME=" + filename
	envvalue2 := "SUBMITLANGUAGE=" + language

	resp, err := cli.ContainerCreate(
		ctx,
		&container.Config{
			Image: imagefilename,
			Cmd:   []string{},
			Env:   []string{envvalue1, envvalue2},
			Tty:   false,
		}, &container.HostConfig{
			Mounts: []mount.Mount{
				{
					Type:   mount.TypeBind,
					Source: "/Users/agota/judgelight/docker/language/c/",
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

	exitCodeCh, errch := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errch:
		if err != nil {
			panic(err)
		}
	case exitCode := <-exitCodeCh:
		//WA
		if exitCode.StatusCode == 1 {
			fmt.Println("WA")
			sendWAsignal()
		}
		//CE
		if exitCode.StatusCode == 2 {
			fmt.Println("CE")
			sendCEsignal()
		}
		//AC
		if exitCode.StatusCode == 0 {
			fmt.Println("AC")
			sendACsignal()
		}
		sendEndsignal()
	}

	err = cli.ContainerRemove(ctx, resp.ID, types.ContainerRemoveOptions{})
	if err != nil {
		panic(err)
	}
}
