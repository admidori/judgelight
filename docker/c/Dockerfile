FROM golang:1.19.1-alpine

RUN apk add --no-cache gcc libc-dev

ENV ROOT=/go/src/app
ENV CGO_ENABLED 0
ENV GOPATH=

COPY go.mod ./go.mod
COPY go.sum ./go.sum

COPY /var/run/docker.sock /var/run/docker.sock

WORKDIR ${ROOT}
RUN apk update && apk add git
RUN go mod download

