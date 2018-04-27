create database rolaguru;
create user 'rolaface'@'localhost' identified by 'rolaface';
grant all on rolaguru.* to 'rolaface1'@'localhost';


CREATE TABLE user(
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(255),
	first_name  VARCHAR(255),
	last_name VARCHAR(255),
	PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE flexerror(
	id INT NOT NULL AUTO_INCREMENT,
	errCode VARCHAR(255) UNIQUE,
	message  VARCHAR(255),
	errortype VARCHAR(255),
	batchType VARCHAR(255),
	PRIMARY KEY (id)
)ENGINE=InnoDB;