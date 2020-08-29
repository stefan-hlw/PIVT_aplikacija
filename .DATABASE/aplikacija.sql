/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `sv2016201747`;
CREATE DATABASE IF NOT EXISTS `sv2016201747` /*!40100 DEFAULT CHARACTER SET utf32 COLLATE utf32_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sv2016201747`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'stefan', '6E782182E95042C55622D2EE7D42373B0C7164EF9A82B40D8D1DD1BC0D61324EFB3FB05E526B8E32B434A65C578EEC6157E67A95FE858FC4E76A566E3110EB0D'),
	(2, 'marko', 'marko'),
	(3, 'iilic', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(21, 'petrovic', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(22, 'cpetrovic', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(23, 'lpetrovic', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(24, 'wdatrovic', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(25, 'dwaovic', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(26, 'dfsdfsd', '41706B2FC7C3D9D8A31AFF5EDF087B96278B765A0C69A1C1E36C6D1391F3D5A59314EB6250152D1FC7E3E035923E2C909C7CA2E9273679701B7A1CBA2C571D9D'),
	(30, 'StefanV', '0F69C2C8363FC30CA41A600EE4612872A67C67F6ED2A699DE2C43CA7DF34AB22A302526B311FF151BA3001FC9230E6AC592F66DC1D70F631BD0ED82D7C9732B0'),
	(31, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) NOT NULL,
  `name` varchar(32) NOT NULL,
  `parent_category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_mage_path` (`image_path`),
  UNIQUE KEY `uq_category_name` (`name`),
  KEY `fk_category_parent_category_id` (`parent_category_id`),
  CONSTRAINT `fk_category_parent_category_id` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `image_path`, `name`, `parent_category_id`) VALUES
	(1, 'imgur.com', 'CatTest', NULL),
	(2, 'https://coolinarika.azureedge.net/images/_variations/9/c/9c924e010ccaed50415e25c96877bb39_view_l.jpg?v=0', 'CategoryTest', 1),
	(4, 'desktop/asd.jpg', 'CatCat', 2),
	(5, 'desktop/dsads.jpg', 'Ewewewe', 1),
	(6, 'desktop/dasdass.jpg', 'dwadwa', 5),
	(7, 'sawdwad', 'dawdawdwa', 6);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE IF NOT EXISTS `ingredients` (
  `ingredient_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `ingredient_category_id` int unsigned NOT NULL,
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `uq_ingredients_name` (`name`),
  KEY `fk_igredients_ingredient_category_id` (`ingredient_category_id`),
  CONSTRAINT `fk_igredients_ingredient_category_id` FOREIGN KEY (`ingredient_category_id`) REFERENCES `ingredient_category` (`ingredient_category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

DELETE FROM `ingredients`;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`ingredient_id`, `name`, `ingredient_category_id`) VALUES
	(1, 'Carrot', 1),
	(2, 'Apple', 2),
	(3, 'Chicken', 3),
	(4, 'Onion', 1),
	(5, 'Garlic', 1),
	(6, 'Celer', 1),
	(7, 'Krastavac', 1);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;

DROP TABLE IF EXISTS `ingredient_category`;
CREATE TABLE IF NOT EXISTS `ingredient_category` (
  `ingredient_category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`ingredient_category_id`),
  UNIQUE KEY `uq_ingredient_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

DELETE FROM `ingredient_category`;
/*!40000 ALTER TABLE `ingredient_category` DISABLE KEYS */;
INSERT INTO `ingredient_category` (`ingredient_category_id`, `name`) VALUES
	(2, 'Fruit'),
	(3, 'Meat'),
	(1, 'Vegetable');
/*!40000 ALTER TABLE `ingredient_category` ENABLE KEYS */;

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE IF NOT EXISTS `recipe` (
  `recipe_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `category_id` int unsigned NOT NULL,
  `administrator_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `instructions` tinytext NOT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `fk_recipe_category_id` (`category_id`),
  KEY `fk_recipe_administrator_id` (`administrator_id`),
  CONSTRAINT `fk_recipe_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`administrator_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_recipe_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

DELETE FROM `recipe`;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` (`recipe_id`, `name`, `category_id`, `administrator_id`, `created_at`, `instructions`) VALUES
	(1, 'SarmaEdit', 1, 1, '2020-08-24 21:43:55', 'Editovane instrukcije'),
	(2, 'Gulas', 2, 1, '2020-08-25 21:54:24', 'instrukcije za pripremu'),
	(3, 'Paprikas', 2, 1, '2020-08-25 21:55:31', 'instrukcije za pripremu'),
	(4, 'Puding', 2, 1, '2020-08-25 21:57:39', 'instrukcije za pripremu'),
	(5, 'Tiramisu', 2, 1, '2020-08-25 22:00:07', 'instrukcije za pripremu'),
	(6, 'Corba', 1, 1, '2020-08-28 17:10:22', 'instrukcije za pripremu'),
	(7, 'Corba 2', 1, 1, '2020-08-28 17:11:25', 'instrukcije za pripremu'),
	(8, 'Corba 2', 1, 1, '2020-08-28 17:11:47', 'instrukcije za pripremu');
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;

DROP TABLE IF EXISTS `recipe_image`;
CREATE TABLE IF NOT EXISTS `recipe_image` (
  `img_id` int unsigned NOT NULL AUTO_INCREMENT,
  `recipe_id` int unsigned NOT NULL,
  `image_path` varchar(128) NOT NULL,
  PRIMARY KEY (`img_id`),
  UNIQUE KEY `uq_recipe_image_image_path` (`image_path`),
  KEY `fk_recipe_image_recipe_id` (`recipe_id`),
  CONSTRAINT `fk_recipe_image_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

DELETE FROM `recipe_image`;
/*!40000 ALTER TABLE `recipe_image` DISABLE KEYS */;
INSERT INTO `recipe_image` (`img_id`, `recipe_id`, `image_path`) VALUES
	(17, 1, '2020828-3721521473-sarma.jpg');
/*!40000 ALTER TABLE `recipe_image` ENABLE KEYS */;

DROP TABLE IF EXISTS `recipe_ingredient`;
CREATE TABLE IF NOT EXISTS `recipe_ingredient` (
  `recipe_ingredient_id` int unsigned NOT NULL AUTO_INCREMENT,
  `recipe_id` int unsigned NOT NULL,
  `ingredient_id` int unsigned NOT NULL,
  `amount` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`recipe_ingredient_id`),
  KEY `fk_recipe_ingredient_recipe_id` (`recipe_id`),
  KEY `fk_recipe_ingredient_ingredient_id` (`ingredient_id`),
  CONSTRAINT `fk_recipe_ingredient_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_recipe_ingredient_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

DELETE FROM `recipe_ingredient`;
/*!40000 ALTER TABLE `recipe_ingredient` DISABLE KEYS */;
INSERT INTO `recipe_ingredient` (`recipe_ingredient_id`, `recipe_id`, `ingredient_id`, `amount`) VALUES
	(3, 3, 1, '14 komada'),
	(4, 4, 1, '14 komada'),
	(5, 5, 1, '14 komada'),
	(6, 6, 2, '16'),
	(7, 7, 2, '16'),
	(8, 8, 2, '16'),
	(13, 1, 2, '23');
/*!40000 ALTER TABLE `recipe_ingredient` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
