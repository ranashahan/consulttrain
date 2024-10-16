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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1,'Session 1','2024-10-04',6001,7001,8004,9001,10001,103,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-04 14:31:05','2024-10-04 14:31:05'),(2,'Session 2','2024-10-12',6001,7001,8001,9001,10001,100,'2024-10-12','2024-10-12','sunny','highway','xyz',1,1001,1001,'2024-10-12 18:40:02','2024-10-12 18:40:02'),(3,'Session 3','2024-10-12',6001,7001,8001,9001,10001,100,'2024-10-12','2024-10-12','sunny','highway','xyz',1,1001,1001,'2024-10-12 20:02:52','2024-10-12 20:02:52'),(4,'Session 4','2024-10-13',6001,7001,8001,9001,10001,6,'2024-10-11','2024-10-12','Sunny','Highway','Malir Road',1,1001,1001,'2024-10-12 20:23:00','2024-10-12 20:23:00'),(5,'Session 5','2024-10-13',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-12 20:36:02','2024-10-12 20:36:02'),(6,'Session 6','2024-10-13',NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 16:45:38','2024-10-13 16:45:38'),(7,'Session 7','2024-10-13',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 16:49:22','2024-10-13 16:49:22'),(8,'Session 8','2024-10-04',6001,7001,8004,9001,10001,103,'2024-10-04','2024-10-04','sunny','highway','Malir road',1,1001,1001,'2024-10-13 16:54:00','2024-10-13 16:54:00'),(9,'Session 9','2024-10-04',6001,7001,8004,9001,10001,103,'2024-10-04','2024-10-04','sunny','highway','Malir road',1,1001,1001,'2024-10-13 16:58:36','2024-10-13 16:58:36'),(10,'Session 10','2024-10-14',6002,7001,8006,9001,10001,10,'2024-10-11','2024-10-11',NULL,NULL,NULL,1,1001,1001,'2024-10-13 20:37:42','2024-10-13 20:37:42'),(11,'Rana Test Session 01','2024-10-14',NULL,7002,8007,9004,10002,48,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 22:34:46','2024-10-13 22:34:46'),(12,'Session 11','2024-10-16',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 13:58:10','2024-10-16 13:58:10'),(13,'Session 12','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 14:03:05','2024-10-16 14:03:05'),(14,'Session 13','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:25:20','2024-10-16 16:25:20'),(15,'Session 14','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:28:56','2024-10-16 16:28:56'),(16,'Session 15','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:32:42','2024-10-16 16:32:42'),(17,'Session 16','2024-10-16',NULL,NULL,NULL,NULL,NULL,48,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:44:02','2024-10-16 16:44:02'),(18,'Session 17','2024-10-16',6003,7003,8005,9004,10002,72,'2024-10-15','2024-10-14','Rainy','Highway','Malir Road',1,1001,1001,'2024-10-16 16:50:11','2024-10-16 16:50:11'),(19,'Session 18','2024-10-15',6003,7003,8004,9002,10002,45,'2024-10-14','2024-10-15','Windy','Double Road','SeaView Road',1,1001,1001,'2024-10-16 16:53:02','2024-10-16 16:53:02');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18 22:32:51
