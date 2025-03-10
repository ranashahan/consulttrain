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
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ntnnumber` varchar(100) DEFAULT NULL,
  `contactperson` varchar(255) DEFAULT NULL,
  `contactnumber` varchar(255) DEFAULT NULL,
  `contactdesignation` varchar(100) DEFAULT NULL,
  `contactdepartment` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `agentname` varchar(255) DEFAULT NULL,
  `agentnumber` varchar(255) DEFAULT NULL,
  `industriesid` int DEFAULT NULL,
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `c_createdby_fk_idx` (`createdby`),
  KEY `c_modifiedby_fk_idx` (`modifiedby`),
  KEY `c_industries_fk_idx` (`industriesid`),
  KEY `id` (`id`),
  CONSTRAINT `c_createdby_fk` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `c_industries_fk` FOREIGN KEY (`industriesid`) REFERENCES `industries` (`id`),
  CONSTRAINT `c_modifiedby_fk` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Shell',NULL,NULL,'John Doe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,23,1001,1001,'2024-09-19 11:22:02','2025-02-19 15:00:43'),(4,'UEP',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1001,1001,'2024-09-19 14:47:20','2024-11-26 21:02:00'),(5,'Marry',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,24,1001,1001,'2024-09-19 14:55:52','2025-02-19 14:58:50'),(6,'Shakoor & Co.',NULL,NULL,'test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1001,1001,'2024-09-19 15:04:42','2024-11-26 21:02:37'),(7,'XyzClient3',NULL,NULL,'ra','0300-222-2222',NULL,NULL,'test 33 test','www.google.com','Ahmed','0300-333-3333',NULL,1001,1001,'2024-09-19 15:08:16','2024-09-19 20:50:46'),(8,'IEP',NULL,NULL,'rana mansoor ahmed','0300-222-2222',NULL,NULL,'A-19/1, Block-14, Gulistan-e-Jouhar','www.google.com','rana imran ahmed','0300-333-3333',15,1001,1001,'2024-09-19 20:48:41','2025-02-18 14:04:32'),(9,'Rana Mansoor Ahmed',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1001,1001,'2025-02-18 14:04:55','2025-02-18 14:04:55');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-20  2:29:29
