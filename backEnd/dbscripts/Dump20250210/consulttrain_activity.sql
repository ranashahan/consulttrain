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
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `initials` varchar(45) DEFAULT NULL,
  `orderid` int DEFAULT NULL,
  `slavecategoryid` int NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `acreatedby_fk_idx` (`createdby`),
  KEY `amodifiedby_fk_idx` (`modifiedby`),
  KEY `ascid_fk` (`slavecategoryid`),
  CONSTRAINT `acreatedby_fk` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `amodifiedby_fk` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`),
  CONSTRAINT `ascid_fk` FOREIGN KEY (`slavecategoryid`) REFERENCES `slavecategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'Seat and head restraint correctly positioned','Updated activity','1',NULL,5,1,1001,1001,'2024-10-03 17:40:16','2024-11-01 04:53:57'),(2,'All mirrors adjusted from driving position - before driving off','2nd acvitity','2',NULL,5,1,1001,1001,'2024-10-03 17:58:39','2024-11-01 04:53:57'),(3,'Use of 4WD / Power Divider','1st acvitity 2nd category','1',1,6,1,1001,1001,'2024-10-03 18:01:21','2024-11-07 12:35:19'),(4,'Seat belt correctly fastened and check of passengers','example description','3',NULL,5,1,1001,1001,'2024-10-03 23:53:11','2024-10-03 23:53:11'),(5,'Starts engine in proper sequence',NULL,'4',NULL,5,1,1001,1001,'2024-10-04 18:00:51','2024-10-04 18:00:51'),(6,'Vehicle moved off smoothly without stalling',NULL,'5',NULL,5,1,1001,1001,'2024-10-04 18:01:15','2024-10-04 18:01:15'),(7,'Use of clutch is smooth and appropriate gear is selected',NULL,'6',NULL,5,1,1001,1001,'2024-10-04 18:01:38','2024-10-04 18:01:38'),(8,'Steering is smooth and not jerky, proper hand position',NULL,'7',NULL,5,1,1001,1001,'2024-10-04 18:01:59','2024-10-04 18:01:59'),(9,'Acceleration is not harsh and not too slow, appropriate speed',NULL,'8',NULL,5,1,1001,1001,'2024-10-04 18:02:50','2024-10-04 18:02:50'),(10,'Checks brakes on moving off, smooth operation (Evaluate use of service and trailer brake for HV)',NULL,'9',NULL,5,1,1001,1001,'2024-10-04 18:03:18','2024-10-04 18:03:18'),(11,'Confidently applies harsh brakes at 50-80 km/h for LV',NULL,'10',NULL,5,1,1001,1001,'2024-10-04 18:03:51','2024-10-04 18:03:51'),(12,'Displays positive driving behavior & avoids aggregation and road rage',NULL,'11',NULL,5,1,1001,1001,'2024-10-04 18:04:19','2024-10-04 18:04:19'),(13,'Displays supportive driving towards other road users',NULL,'12',NULL,5,1,1001,1001,'2024-10-04 18:04:48','2024-10-04 18:04:48'),(14,'Displays alertness & concentration in adapting changing / adverse conditions',NULL,'13',NULL,5,1,1001,1001,'2024-10-04 18:05:24','2024-10-04 18:05:24'),(15,'Follows speed limits for different zones and scans speedometer regularly',NULL,'14',NULL,5,1,1001,1001,'2024-10-04 18:06:22','2024-10-04 18:06:22'),(16,'Communicates clearly, fluently and accurately',NULL,'15',NULL,5,1,1001,1001,'2024-10-04 18:07:32','2024-10-04 18:07:32'),(17,'Adjust driving as per commentary ',NULL,'16',2,5,1,1001,1001,'2024-10-04 18:07:52','2024-11-07 12:25:10'),(18,'Control of speed',NULL,'2',2,6,1,1001,1001,'2024-10-04 18:08:30','2024-11-07 12:35:25'),(19,'Knowledge of braking techniques',NULL,'3',3,6,1,1001,1001,'2024-10-04 18:08:52','2024-11-07 12:42:07'),(20,'Use of engine brake (HV score 2 for LV)',NULL,'4',4,6,1,1001,1001,'2024-10-04 18:11:32','2024-11-07 12:42:11'),(21,'Descending',NULL,'5',5,6,1,1001,1001,'2024-10-04 18:11:53','2024-11-07 12:42:16'),(22,'Ascending',NULL,'6',6,6,1,1001,1001,'2024-10-04 18:12:10','2024-11-07 12:42:22'),(23,'Negotiating corners',NULL,'7',7,6,1,1001,1001,'2024-10-04 18:12:34','2024-11-07 12:42:27'),(24,'Passing',NULL,'8',8,6,1,1001,1001,'2024-10-04 18:12:55','2024-11-23 11:45:19'),(25,'Vehicle walk around - Inspects the vehicle thoroughly through 360 walk around for external damages','Vehicle walk around','1.1',1,8,1,1001,1001,'2024-10-17 15:00:39','2024-11-07 12:43:25'),(26,'test','test','a',1,5,1,1001,1001,'2024-11-07 12:15:58','2024-11-07 12:15:58'),(27,'Parallel Parking','Parallel Parking description','1',1,7,1,1001,1001,'2024-11-07 12:37:11','2024-11-07 12:37:11'),(28,'Seeing zones - Actively searches all seeing zones to identify hazards','Seeing zones','3.1',1,10,1,1001,1001,'2024-11-07 13:30:02','2024-11-07 13:30:02'),(29,'xx',NULL,NULL,NULL,5,1,1001,1001,'2024-11-23 08:31:12','2024-11-23 08:31:12'),(30,'Parallel Parking',NULL,NULL,1,11,1,1001,1001,'2024-12-29 15:06:50','2024-12-29 15:08:30'),(31,'Parallel Parking - In Reverse',NULL,NULL,2,11,1,1001,1001,'2024-12-29 15:07:34','2024-12-29 15:08:40'),(32,'Perpendicular Parking',NULL,NULL,3,11,1,1001,1001,'2024-12-29 15:08:14','2024-12-29 15:08:47'),(33,'Perpendicular Parking - In Reverse',NULL,NULL,4,11,1,1001,1001,'2024-12-29 15:09:23','2024-12-29 15:09:23'),(34,'Use of vehicle controls',NULL,NULL,1,12,1,1001,1001,'2024-12-29 15:10:13','2024-12-29 15:10:13'),(35,'Concertation',NULL,NULL,2,12,1,1001,1001,'2024-12-29 15:10:37','2024-12-29 15:10:37');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10  3:23:00
