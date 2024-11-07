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
  `dob` date DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `nicexpiry` date DEFAULT NULL,
  `licensenumber` varchar(255) DEFAULT NULL,
  `licensetypeid` int DEFAULT NULL,
  `licenseexpiry` date DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `permitnumber` varchar(255) DEFAULT NULL,
  `permitissue` date DEFAULT NULL,
  `permitexpiry` date DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=20037 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `set_expiry_date` BEFORE INSERT ON `driver` FOR EACH ROW SET NEW.permitexpiry = DATE_ADD(NEW.permitissue, INTERVAL 2 YEAR) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-07 19:02:10
