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
-- Table structure for table `slavecategory`
--

DROP TABLE IF EXISTS `slavecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slavecategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `initials` varchar(45) DEFAULT NULL,
  `orderid` int DEFAULT NULL,
  `mastercategoryid` int NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `createdby` int DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sccreatedby_idx` (`createdby`),
  KEY `scmodifiedby_idx` (`modifiedby`),
  KEY `scmasterid_idx` (`mastercategoryid`),
  CONSTRAINT `sccreatedby` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `scmasterid` FOREIGN KEY (`mastercategoryid`) REFERENCES `mastercategory` (`id`),
  CONSTRAINT `scmodifiedby` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slavecategory`
--

LOCK TABLES `slavecategory` WRITE;
/*!40000 ALTER TABLE `slavecategory` DISABLE KEYS */;
INSERT INTO `slavecategory` VALUES (5,'Basic Driving Skills','Updated slave category','A',1,1,1,1001,1001,'2024-10-03 17:18:37','2024-11-07 13:24:26'),(6,'MOUNTAIN / DESERT DRIVING','Updated slave category','B',2,1,1,1001,1001,'2024-10-03 17:41:35','2024-11-07 13:24:38'),(7,'MANEUVERING ASSESSMENT','example description','C',3,1,1,1001,1001,'2024-10-03 20:56:52','2024-11-07 13:24:45'),(8,'PRE-TRIP INSPECTION','Testing this inspection','',4,2,1,1001,1001,'2024-10-16 17:10:33','2024-11-07 13:24:52'),(9,'sdf','asdf','asdf',NULL,2,0,1001,1001,'2024-11-01 05:41:04','2024-11-06 13:55:31'),(10,'AIM HIGH IN STEERING','Testing this inspection',NULL,5,2,1,1001,1001,'2024-11-07 13:29:06','2024-11-07 13:29:06'),(11,'Yard Check','This is yard check cateogry',NULL,6,5,1,1001,1001,'2024-12-29 15:03:05','2024-12-29 15:12:58'),(12,'Risk Profile','This is risk profile',NULL,6,5,1,1001,1001,'2024-12-29 15:03:33','2024-12-29 15:13:02');
/*!40000 ALTER TABLE `slavecategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-20  2:29:28
