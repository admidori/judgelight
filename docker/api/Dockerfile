FROM golang:1.19.1-alpine

ENV ROOT=/go/src/app
ENV CGO_ENABLED 0
ENV GOPATH=

COPY go.mod ./go.mod
COPY go.sum ./go.sum

COPY /var/run/docker.sock /var/run/docker.sock

WORKDIR ${ROOT}
RUN apk update && apk add git
RUN go mod download

CMD [ "go" , "run" , "./cmd/backend/main.go" ]