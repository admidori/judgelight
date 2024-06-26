CREATE DATABASE JUDGELIGHT;

CREATE TABLE JUDGELIGHT.USER (
    STUDENT_ID VARCHAR(5) NOT NULL PRIMARY KEY,
    STUDENT_PASSWORD VARCHAR(10) NOT NULL
);

CREATE TABLE JUDGELIGHT.PROBLEM (
    PROBLEM_ID INT NOT NULL PRIMARY KEY,
    PROBLEM_TITLE VARCHAR(100) NOT NULL,
    PROBLEM_SCORE INT NOT NULL,
    LIMIT_EXECUTE_TIME INT NOT NULL,
    LIMIT_EXECUTE_MEMORY INT NOT NULL,
    PROBLEM_DESCRIPTION VARCHAR(1000) NOT NULL,
    INPUT_DESCRIPTION VARCHAR(1000) NOT NULL,
    OUTPUT_DESCRIPTION VARCHAR(1000) NOT NULL,
    INITIAL_CODE VARCHAR(10000) NOT NULL,
    TEST_CASE JSON,
    SECRET_CASE JSON
);

CREATE TABLE JUDGELIGHT.CONTEST (
    TITLE VARCHAR(100) NOT NULL PRIMARY KEY,
    START_TIME DATETIME NOT NULL,
    END_TIME DATETIME NOT NULL
);

CREATE TABLE JUDGELIGHT.RESULT (
    STUDENT_ID VARCHAR(5) NOT NULL,
    PROBLEM_ID INT NOT NULL,
    RESULT INT NOT NULL,
    FOREIGN KEY (STUDENT_ID) REFERENCES JUDGELIGHT.USER(STUDENT_ID),
    FOREIGN KEY (PROBLEM_ID) REFERENCES JUDGELIGHT.PROBLEM(PROBLEM_ID),
    PRIMARY KEY (STUDENT_ID, PROBLEM_ID)
);
