DROP SCHEMA IF EXISTS `fibdb`; 
CREATE SCHEMA IF NOT EXISTS `fibdb`; 
USE `fibdb`;
CREATE USER 'fibuser'@'localhost' IDENTIFIED BY 'fibuser';
GRANT ALL PRIVILEGES ON * . * TO 'fibuser'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'appuser'@'%' IDENTIFIED BY 'appuser';
GRANT ALL PRIVILEGES ON * . * TO 'appuser'@'%';
FLUSH PRIVILEGES;


DROP TABLE IF EXISTS `fibonacci`;
CREATE TABLE `fibonacci` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`series` LONGTEXT NOT NULL,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

USE `fibdb`;
SELECT * FROM `fibonacci`;