CREATE DATABASE  IF NOT EXISTS `consulttrain` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `consulttrain`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: consulttrain
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sessiondate` date DEFAULT NULL,
  `locationid` int DEFAULT NULL,
  `resultid` int DEFAULT NULL,
  `stageid` int DEFAULT NULL,
  `titleid` int DEFAULT NULL,
  `vehicleid` int DEFAULT NULL,
  `totalscore` int DEFAULT NULL,
  `classdate` date DEFAULT NULL,
  `yarddate` date DEFAULT NULL,
  `weather` varchar(100) DEFAULT NULL,
  `traffic` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `quizscore` varchar(100) DEFAULT NULL,
  `comment` mediumtext,
  `active` int DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `locationid_fk_idx` (`locationid`),
  KEY `resultid_fk_idx` (`resultid`),
  KEY `stageid_fk_idx` (`stageid`),
  KEY `titleid_fk_idx` (`titleid`),
  KEY `vehicelid_fk_idx` (`vehicleid`),
  CONSTRAINT `locationid_fk` FOREIGN KEY (`locationid`) REFERENCES `location` (`id`),
  CONSTRAINT `resultid_fk` FOREIGN KEY (`resultid`) REFERENCES `result` (`id`),
  CONSTRAINT `stageid_fk` FOREIGN KEY (`stageid`) REFERENCES `stage` (`id`),
  CONSTRAINT `titleid_fk` FOREIGN KEY (`titleid`) REFERENCES `title` (`id`),
  CONSTRAINT `vehicleid_fk` FOREIGN KEY (`vehicleid`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15  3:43:47
