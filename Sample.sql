-- Active: 1667225725231@@192.168.1.12@3309@users
CREATE DATABASE `users`;
USE `users`;
CREATE TABLE `user_register`(

  `id` INT NOT NULL AUTO_INCREMENT,

  `firstname` VARCHAR(100) NOT NULL,

  `lastname` VARCHAR(100) NOT NULL,

  `username` VARCHAR(100) NOT NULL,

  PRIMARY KEY (`id`)

);


INSERT INTO `users`.`user_register` (`firstname`, `lastname`, `username`) 
VALUES ('harry', 'potter', 'popo');

INSERT INTO `users`.`user_register` (`firstname`, `lastname`, `username`) 
VALUES ('Jennie', 'Nichols', 'yellowpeacock117');


INSERT INTO `users`.`user_register` (`firstname`, `lastname`, `username`) 
VALUES ('Rebecca', 'OReilly', 'rebecca.o.reilly');

INSERT INTO `users`.`user_register` (`firstname`, `lastname`, `username`) 
VALUES ('Jerrold', 'Corwin', 'jerrold.corwin');


