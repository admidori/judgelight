package docker

import (
	"archive/tar"
	"bytes"
	"context"
	"io"
	"io/ioutil"
	"log"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

var (
	dockerfileName   string   = "c.Dockerfile"
	imageNameAndTags []string = []string{"c-language:tag"}
)

func BuildDockerfile() {
	ctx := context.Background()

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Panic(err)
	}
	cli.NegotiateAPIVersion(ctx)

	buildOptions := types.ImageBuildOptions{
		Dockerfile: dockerfileName,
		Remove:     true,
		Tags:       imageNameAndTags,
	}
	res, err := cli.ImageBuild(
		ctx,
		getArchivedDockerfile(dockerfileName),
		buildOptions,
	)
	if err != nil {
		log.Panic(err)
	}
	defer res.Body.Close()

	io.Copy(os.Stdout, res.Body)
}

func getArchivedDockerfile(dockerfile string) *bytes.Reader {
	// read the Dockerfile
	f, err := os.Open(dockerfile)
	if err != nil {
		log.Panic(err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Panic(err)
		}
	}()
	b, err := ioutil.ReadAll(f)
	if err != nil {
		log.Panic(err)
	}

	// archive the Dockerfile
	tarHeader := &tar.Header{
		Name: dockerfile,
		Size: int64(len(b)),
	}
	buf := new(bytes.Buffer)
	tw := tar.NewWriter(buf)
	defer tw.Close()
	err = tw.WriteHeader(tarHeader)
	if err != nil {
		log.Panic(err)
	}
	_, err = tw.Write(b)
	if err != nil {
		log.Panic(err)
	}

	return bytes.NewReader(buf.Bytes())
}