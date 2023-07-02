# For C-language
FROM ubuntu:latest

RUN apt-get update && apt-get install -y gcc

RUN mkdir work
ADD /work/exec.sh /work/
WORKDIR /work
RUN chmod 777 exec.sh

CMD ["./exec.sh"]

#CMD [ "chmod", "777", "exec.sh", "&&", "./exec.sh", "||", "RET=$?", "||", "true", "&&", "test", "RET", "-eq", "0" ]