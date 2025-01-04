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
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `nicexpiry` date DEFAULT NULL,
  `licensenumber` varchar(255) DEFAULT NULL,
  `licensetypeid` int DEFAULT NULL,
  `licenseexpiry` date DEFAULT NULL,
  `licenseverified` tinyint(1) NOT NULL DEFAULT '1',
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `permitnumber` varchar(255) NOT NULL,
  `permitissue` date DEFAULT NULL,
  `permitexpiry` date DEFAULT NULL,
  `medicalexpiry` date DEFAULT NULL,
  `bloodgroupid` int DEFAULT NULL,
  `contractorid` int DEFAULT NULL,
  `visualid` int DEFAULT NULL,
  `ddccount` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permitnumber_UNIQUE` (`permitnumber`),
  KEY `bloodgroup_fk_idx` (`bloodgroupid`),
  KEY `licensetype_fk_idx` (`licensetypeid`),
  KEY `createdby_fk_idx` (`createdby`),
  KEY `modifiedby_fk_idx` (`modifiedby`),
  KEY `contractor_fk_idx` (`contractorid`),
  KEY `visualid_fk_idx` (`visualid`),
  KEY `nic` (`nic`),
  CONSTRAINT `bloodgroup_fk` FOREIGN KEY (`bloodgroupid`) REFERENCES `bloodgroup` (`id`),
  CONSTRAINT `contractor_fk` FOREIGN KEY (`contractorid`) REFERENCES `contractor` (`id`),
  CONSTRAINT `createdby_fk` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `licensetype_fk` FOREIGN KEY (`licensetypeid`) REFERENCES `licensetype` (`id`),
  CONSTRAINT `modifiedby_fk` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`),
  CONSTRAINT `visualid_fk` FOREIGN KEY (`visualid`) REFERENCES `visual` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20065 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-04 22:25:05
