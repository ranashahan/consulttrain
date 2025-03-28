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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1,'Session 1','2024-10-04',6001,7001,8004,9001,10001,103,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1001,1001,'2024-10-04 14:31:05','2024-10-27 21:51:16'),(2,'Session 2','2024-10-12',6001,7001,8001,9001,10001,100,'2024-10-12','2024-10-12','sunny','highway','xyz',NULL,NULL,0,1001,1001,'2024-10-12 18:40:02','2024-10-27 22:01:06'),(3,'Session 3','2024-10-12',6001,7001,8001,9001,10001,100,'2024-10-12','2024-10-12','sunny','highway','xyz',NULL,NULL,0,1001,1001,'2024-10-12 20:02:52','2024-10-27 22:07:51'),(4,'Session 4','2024-10-13',6001,7001,8001,9001,10001,6,'2024-10-11','2024-10-12','Sunny','Highway','Malir Road',NULL,NULL,1,1001,1001,'2024-10-12 20:23:00','2024-10-12 20:23:00'),(5,'Session 5','2024-10-13',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-12 20:36:02','2024-10-12 20:36:02'),(6,'Session 6','2024-10-13',NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 16:45:38','2024-10-13 16:45:38'),(7,'Session 7','2024-10-13',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 16:49:22','2024-10-13 16:49:22'),(8,'Session 8','2024-10-04',6001,7001,8004,9001,10001,103,'2024-10-04','2024-10-04','sunny','highway','Malir road',NULL,NULL,1,1001,1001,'2024-10-13 16:54:00','2024-10-13 16:54:00'),(9,'Session 9','2024-10-04',6001,7001,8004,9001,10001,103,'2024-10-04','2024-10-04','sunny','highway','Malir road',NULL,NULL,1,1001,1001,'2024-10-13 16:58:36','2024-10-13 16:58:36'),(10,'Session 10','2024-10-14',6002,7001,8006,9001,10001,10,'2024-10-11','2024-10-11',NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 20:37:42','2024-10-13 20:37:42'),(11,'Rana Test Session 01','2024-10-14',NULL,7002,8007,9004,10002,48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-13 22:34:46','2024-10-13 22:34:46'),(12,'Session 11','2024-10-16',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 13:58:10','2024-10-16 13:58:10'),(13,'Session 12','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 14:03:05','2024-10-16 14:03:05'),(14,'Session 13','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:25:20','2024-10-16 16:25:20'),(15,'Session 14','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:28:56','2024-10-16 16:28:56'),(16,'Session 15','2024-10-16',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:32:42','2024-10-16 16:32:42'),(17,'Session 16','2024-10-16',NULL,NULL,NULL,NULL,NULL,48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-16 16:44:02','2024-10-16 16:44:02'),(18,'Session 17','2024-10-16',6003,7003,8005,9004,10002,72,'2024-10-15','2024-10-14','Rainy','Highway','Malir Road',NULL,NULL,1,1001,1001,'2024-10-16 16:50:11','2024-10-16 16:50:11'),(19,'Session 18','2024-10-15',6003,7003,8004,9002,10002,52,'2024-10-14','2024-10-15','Windy','Double Road','SeaView Road',NULL,NULL,0,1001,1001,'2024-10-16 16:53:02','2024-10-30 12:16:06'),(20,'Rana-Pro-01-01','2024-10-15',NULL,NULL,NULL,NULL,NULL,19,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-19 16:41:45','2024-10-25 18:40:45'),(21,'asdf','2024-10-26',NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1001,1001,'2024-10-25 21:40:02','2024-10-27 22:52:13'),(22,'Rana Delete Test','2024-10-28',6001,7001,8001,9001,10001,48,'2024-10-27','2024-10-27','Sunny','Highway','Malir Road',NULL,NULL,0,1001,1001,'2024-10-27 22:13:01','2024-10-27 22:19:54'),(23,'Rana Delete Session 1','2024-10-28',6001,7001,8001,9001,10001,18,'2024-10-27','2024-10-27','Sunny','Highway','Malir Road',NULL,NULL,0,1001,1001,'2024-10-27 22:33:22','2024-10-27 22:44:06'),(24,'rana delete test 3','2024-10-28',NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1001,1001,'2024-10-27 22:46:58','2024-10-27 22:48:54'),(25,'rana delete test 4','2024-10-28',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1001,1001,'2024-10-27 22:47:30','2024-10-27 22:49:17'),(26,'Session 22','2024-10-30',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1001,1001,'2024-10-29 23:20:16','2024-10-30 10:36:16'),(27,'Session 18','2024-10-30',NULL,7001,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-10-30 12:16:57','2024-11-03 18:46:20'),(28,'test','2024-11-03',NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1001,1001,'2024-11-02 20:16:14','2024-11-02 20:16:31'),(29,'testing train 01','2024-11-03',NULL,NULL,NULL,NULL,NULL,9,'2024-11-01',NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-02 20:48:04','2024-11-02 20:48:04'),(30,'Rana Test S-01-10-2024','2024-11-04',NULL,7001,NULL,NULL,NULL,12,'2024-11-03',NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-03 23:30:06','2024-11-03 23:30:06'),(31,'Rana Test S-02-10-2024','2024-11-04',NULL,7001,NULL,NULL,NULL,18,'2024-11-02',NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-03 23:31:18','2024-11-03 23:31:18'),(32,'Session 21','2024-11-06',6009,7001,8001,9001,10002,9,'2024-11-05',NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-06 13:55:15','2024-11-06 13:55:15'),(33,'Session 14112024','2024-11-14',6009,7001,8001,9001,10002,24,'2024-11-13','2024-11-13','raining','test','test',NULL,NULL,1,1002,1002,'2024-11-14 09:40:09','2024-11-14 09:41:01'),(34,'Session 15-11-2024-01','2024-11-15',6009,7001,8001,9002,10002,15,'2024-11-14','2024-11-14','test','test','test',NULL,NULL,1,1001,1001,'2024-11-15 17:12:38','2024-11-15 17:12:38'),(35,'Session 10','2024-11-27',6001,7001,8004,9001,10001,103,'2024-11-26','2024-11-26','sunny','highway','Malir road',NULL,NULL,0,1001,1001,'2024-11-26 21:41:55','2024-11-26 22:15:06'),(36,'Session 10','2024-11-27',6001,7001,8004,9001,10001,103,'2024-11-26','2024-11-26','sunny','highway','Malir road','20/30',NULL,1,1001,1001,'2024-11-26 22:30:26','2024-11-26 22:30:26'),(37,'asdfdsf','2024-11-27',NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-26 23:39:39','2024-11-26 23:39:39'),(38,'Session 122','2024-11-28',6003,7001,8001,9001,10002,6,'2024-11-28','2024-11-28',NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-28 07:44:33','2024-11-28 07:44:33'),(39,'Session 123','2024-11-28',6008,7001,8001,9002,10002,9,'2024-11-28','2024-11-28',NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-11-28 07:45:52','2024-11-28 07:45:52'),(40,'Session 1343','2024-11-28',NULL,7001,NULL,NULL,NULL,3,'2024-11-28',NULL,NULL,NULL,NULL,'434',NULL,1,1001,1001,'2024-11-28 09:20:31','2024-11-28 09:22:33'),(41,'Session 1232','2024-11-29',NULL,NULL,8006,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,NULL,'He is advised to familiarize himself with the vehicle\'s controls.\nHe is advised to keep 100% of his attention on road blind spots. Focus is the key to safe driving.\nHe is advised to become aware of the actions of other road users. \nHe is advised to prepared for identifying potential hazards well in advance and managing them safely.\nHe is advised to identify potential hazards in advance.\nHe is advised to position his vehicle correctly, stay in the middle of a lane, and follow lane discipline.\nHe must check the mirrors more frequently.\nHe must practice maneuvering and avoid unsafe maneuvers.\nHe will be more safe by keeping a safe following distance on the road. i.e. 4-7 seconds.\nHis curve approach is currently negative and requires improvement in handling them.\nHas been briefed and coached on weaknesses observed during driving.',1,1001,1001,'2024-11-29 00:50:50','2024-12-11 18:55:18'),(42,'Session signal','2024-12-15',6003,7001,8006,9003,10002,87,'2024-12-13','2024-12-13','Rainy','Highway','M9','25','testing comments',1,1001,1001,'2024-12-14 22:14:45','2024-12-14 22:14:45'),(43,'Session 10101','2024-12-31',6012,NULL,NULL,NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-12-18 06:21:32','2024-12-18 06:27:27'),(44,'UEP-DDTA-2411-22-01','2024-11-22',6003,7002,8006,9001,10001,31,'2024-11-21','2024-11-22',NULL,NULL,NULL,NULL,NULL,1,1010,1010,'2024-12-18 11:29:26','2024-12-18 11:29:26'),(45,'UEp-DDTA-2412-12-01','2024-11-23',6002,7001,8005,9003,10001,19,'2024-11-24',NULL,NULL,NULL,NULL,NULL,NULL,1,1010,1010,'2024-12-18 11:52:03','2024-12-18 11:52:03'),(46,'test','2024-12-19',NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-12-19 17:24:39','2024-12-19 17:24:39'),(47,'Session-Rana-01','2024-12-19',6010,7002,8006,9003,10002,12,'2024-12-18','2024-12-18','rain','Local Road','Joher','33',NULL,1,1001,1001,'2024-12-19 17:42:53','2024-12-19 17:42:53'),(48,'Session-Rana-02','2024-12-19',6002,7001,8007,9001,10003,0,'2024-12-17','2024-12-17','rain','Local Road','Joher','33',NULL,1,1001,1001,'2024-12-19 17:49:45','2024-12-19 17:49:45'),(49,'Session-Rana-03','2024-12-19',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-12-19 17:51:01','2024-12-19 17:51:01'),(50,'Session-Rana-04','2024-12-19',NULL,NULL,NULL,NULL,NULL,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-12-19 17:56:36','2024-12-19 17:56:36'),(51,'Session-Rana-05','2024-12-20',6012,7001,8006,9002,10002,87,'2024-12-19','2024-12-18','rain','Local Road','Joher','33',NULL,1,1001,1001,'2024-12-20 17:44:35','2024-12-20 17:44:35'),(52,'Session-Rana-06','2024-12-20',6006,7001,8005,9002,10002,12,'2024-12-19','2024-12-19',NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-12-20 18:51:59','2024-12-20 18:51:59'),(53,'UEp-DDTA-2410-12-01','2025-01-07',6011,7001,8002,9004,10005,54,'2025-01-06','2025-01-06','rain','Local Road','Joher','33',NULL,1,1001,1001,'2025-01-07 18:46:56','2025-01-07 18:46:56'),(54,'UEP-DDTA-2411-22-05','2025-02-03',6009,7001,8006,9002,10002,53,'2025-01-31','2025-02-02','rainy','Local Road','Joher','20',NULL,1,1001,1001,'2025-02-03 06:51:57','2025-02-03 06:51:57'),(55,'UEP-DDTA-2411-22-06','2025-02-07',NULL,NULL,NULL,NULL,NULL,0,'2025-02-07',NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2025-02-07 09:42:07','2025-02-07 09:42:07'),(56,'UEP-DDTA-2411-22-07','2025-02-08',6004,7001,8006,9002,10002,300,'2025-02-07','2025-02-07','rain','Local Road','Joher','33','test',1,1001,1001,'2025-02-07 19:06:29','2025-02-09 19:30:20'),(57,'UEP-DDTA-2411-22-08','2025-02-10',NULL,NULL,NULL,NULL,NULL,18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2025-02-09 19:49:24','2025-02-09 19:50:02');
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

-- Dump completed on 2025-02-10  3:22:59
