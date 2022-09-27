FROM golang:1.19.1-alpine

ENV ROOT=/go/src/app
ENV CGO_ENABLED 0
ENV GOPATH=

COPY go.mod go.sum ./

WORKDIR ${ROOT}
RUN apk update && apk add git
RUN go mod tidy

EXPOSE 8081

CMD [ "go" , "run" , "./cmd/main.go" ]