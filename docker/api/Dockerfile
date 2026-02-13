FROM golang:1.24.0-alpine

ENV ROOT=/go/src/app
ENV CGO_ENABLED 0
ENV GOPATH=

WORKDIR /go/src/app
COPY go.mod ./go.mod
COPY go.sum ./go.sum

# change below.
#WORKDIR /var/run
#COPY /var/run/docker.sock ./docker.sock

RUN apk update && apk add git
RUN go mod download

WORKDIR /go/src/app/cmd/backend
CMD [ "go" , "run" , "./main.go" ]
