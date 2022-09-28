FROM mysql:5.7

COPY ./database/docker/conf/my.cnf /etc/mysql/conf.d/my.cnf
COPY ./database/docker/test /docker-entrypoint-initdb.d

CMD [ "mysqld", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci" ]