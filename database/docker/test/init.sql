# Excute it when create docker container.
CREATE TABLE user
(
user_id CHAR(5) NOT NULL , 
user_name CHAR(10) NOT NULL, 
password CHAR(5) NOT NULL,
PRIMARY KEY (user_id)
FOREIGN KEY (user_id)
);

CREATE TABLE 