CREATE DATABASE JUDGELIGHT;

# Defile user table
CREATE TABLE JUDGELIGHT.USER(
    ID varchar(5) NOT NULL,
    PASSWORD varchar(10) NOT NULL,
    PRIMARY KEY (ID),
);

# Defile result table
CREATE TABLE JUDGELIGHT.RESULT(
    ID varchar(5) NOT NULL,
    PROBLEM_ID varchar(5),
    SUBMIT_ID varchar(5),
    RESULT INT,
    FOREIGN KEY (ID) REFERENCES USER(ID),
);

# Future: Problem and answer dataset are inserted to MySQL DB.
