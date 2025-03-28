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
-- Table structure for table `visual`
--

DROP TABLE IF EXISTS `visual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visual` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `VIcreatedby_idx` (`createdby`),
  KEY `VImodifiedby_idx` (`modifiedby`),
  CONSTRAINT `VIcreatedby` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `VImodifiedby` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=11007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visual`
--

LOCK TABLES `visual` WRITE;
/*!40000 ALTER TABLE `visual` DISABLE KEYS */;
INSERT INTO `visual` VALUES (11001,'Normal',NULL,1001,1001,'2024-09-15 19:00:00','2024-09-15 19:00:00'),(11002,'Abnormal',NULL,1001,1001,'2024-10-05 17:27:58','2024-10-05 17:27:58'),(11003,'Glasses Prescribed',NULL,1001,1001,'2024-10-05 17:28:12','2024-10-05 17:28:12'),(11004,'Glassess','New Descriptions',1001,1001,'2024-11-06 14:22:22','2024-11-06 14:22:29'),(11005,'Fit with glasses','xyz',1001,1001,'2024-11-28 17:29:07','2024-12-10 12:37:13'),(11006,'test','test',1001,1001,'2024-12-10 12:34:52','2024-12-10 12:34:52');
/*!40000 ALTER TABLE `visual` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10  3:22:59
