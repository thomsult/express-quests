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



ALTER TABLE user_register
ADD `language` VARCHAR(255);

ALTER TABLE user_register
ADD `city` VARCHAR(255);

UPDATE user_register set `language`='EN',`city`='London' where id = 1 ;
UPDATE user_register set `language`='EN',`city`='New York' where id = 2 ;
UPDATE user_register set `language`='CA',`city`='Monreal' where id = 3 ;
UPDATE user_register set `language`='IR',`city`='Dublin' where id = 4;

SELECT * FROM `users`.`user_register` LIMIT 1000;