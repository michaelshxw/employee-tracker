DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- CREATE TABLES -- 

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- references used for creating table -- 

-- PRIMARY AND FOREIGN KEY: explanation and understanding -- 
-- https://www.essentialsql.com/foreign-primary-key-differences/#h-what-is-the-difference-between-a-primary-key-and-a-foreign-key -- 


