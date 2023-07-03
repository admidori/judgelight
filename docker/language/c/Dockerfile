# For C-language
FROM ubuntu:latest

RUN apt-get update && apt-get install -y gcc

WORKDIR /workspace/work/
CMD ["./exec.sh"]

#CMD [ "chmod", "777", "exec.sh", "&&", "./exec.sh", "||", "RET=$?", "||", "true", "&&", "test", "RET", "-eq", "0" ]