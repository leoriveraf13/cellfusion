CREATE DATABASE IF NOT EXISTS cellfusion;

CREATE  TABLE IF NOT EXISTS `cellfusion`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL ,
  `total` INT NOT NULL ,
  `remaining` VARCHAR(150) NOT NULL ,
  `warehouse` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

CREATE  TABLE IF NOT EXISTS `cellfusion`.`warehouse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL ,
  `minProd` INT NOT NULL ,
  `maxProd` VARCHAR(150) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;