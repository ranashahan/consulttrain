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
-- Table structure for table `assessment`
--

DROP TABLE IF EXISTS `assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionid` int DEFAULT NULL,
  `slavecategoryid` int DEFAULT NULL,
  `activityid` int DEFAULT NULL,
  `assessment_type` enum('Initial','Middle','Final') NOT NULL,
  `score` int DEFAULT NULL,
  `assessmentdate` date NOT NULL,
  PRIMARY KEY (`id`,`assessmentdate`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
/*!50100 PARTITION BY RANGE (year(`assessmentdate`))
(PARTITION p2023 VALUES LESS THAN (2024) ENGINE = InnoDB,
 PARTITION p2024 VALUES LESS THAN (2025) ENGINE = InnoDB,
 PARTITION p2025 VALUES LESS THAN (2026) ENGINE = InnoDB,
 PARTITION p2026 VALUES LESS THAN (2027) ENGINE = InnoDB,
 PARTITION p2027 VALUES LESS THAN (2028) ENGINE = InnoDB,
 PARTITION future VALUES LESS THAN MAXVALUE ENGINE = InnoDB) */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment`
--

LOCK TABLES `assessment` WRITE;
/*!40000 ALTER TABLE `assessment` DISABLE KEYS */;
INSERT INTO `assessment` VALUES (1,1,5,1,'Initial',1,'2024-10-04'),(2,1,5,1,'Middle',2,'2024-10-04'),(3,1,5,1,'Final',3,'2024-10-04'),(4,2,5,1,'Final',3,'2024-10-12'),(5,2,5,2,'Final',2,'2024-10-12'),(6,2,5,4,'Final',3,'2024-10-12'),(7,2,5,5,'Final',2,'2024-10-12'),(8,2,5,6,'Final',2,'2024-10-12'),(9,2,5,7,'Final',3,'2024-10-12'),(10,2,5,8,'Final',2,'2024-10-12'),(11,2,5,9,'Final',3,'2024-10-12'),(12,2,5,10,'Final',2,'2024-10-12'),(13,2,5,11,'Final',3,'2024-10-12'),(14,2,5,12,'Final',2,'2024-10-12'),(15,3,5,1,'Final',3,'2024-10-12'),(16,3,5,2,'Final',2,'2024-10-12'),(17,3,5,4,'Final',3,'2024-10-12'),(18,3,5,5,'Final',2,'2024-10-12'),(19,3,5,6,'Final',2,'2024-10-12'),(20,3,5,7,'Final',3,'2024-10-12'),(21,3,5,8,'Final',2,'2024-10-12'),(22,3,5,9,'Final',3,'2024-10-12'),(23,3,5,10,'Final',2,'2024-10-12'),(24,3,5,11,'Final',3,'2024-10-12'),(25,3,5,12,'Final',2,'2024-10-12'),(26,4,5,1,'Final',3,'2024-10-13'),(27,4,5,2,'Final',2,'2024-10-13'),(28,4,5,4,'Final',1,'2024-10-13'),(29,5,5,1,'Final',3,'2024-10-13'),(30,6,5,1,'Final',3,'2024-10-13'),(31,6,5,2,'Final',2,'2024-10-13'),(32,6,5,4,'Final',1,'2024-10-13'),(33,7,5,1,'Final',3,'2024-10-13'),(34,8,5,1,'Initial',1,'2024-10-04'),(35,8,5,1,'Middle',2,'2024-10-04'),(36,8,5,1,'Final',3,'2024-10-04'),(37,9,5,1,'Initial',1,'2024-10-04'),(38,9,5,1,'Middle',2,'2024-10-04'),(39,9,5,1,'Final',3,'2024-10-04'),(40,10,5,1,'Final',2,'2024-10-14'),(41,10,5,2,'Final',3,'2024-10-14'),(42,10,5,4,'Final',2,'2024-10-14'),(43,10,5,5,'Final',3,'2024-10-14'),(44,11,5,1,'Final',3,'2024-10-14'),(45,11,5,2,'Final',3,'2024-10-14'),(46,11,5,4,'Final',3,'2024-10-14'),(47,11,5,5,'Final',3,'2024-10-14'),(48,11,5,6,'Final',3,'2024-10-14'),(49,11,5,7,'Final',3,'2024-10-14'),(50,11,5,8,'Final',3,'2024-10-14'),(51,11,5,9,'Final',3,'2024-10-14'),(52,11,5,10,'Final',3,'2024-10-14'),(53,11,5,11,'Final',3,'2024-10-14'),(54,11,5,12,'Final',3,'2024-10-14'),(55,11,5,13,'Final',3,'2024-10-14'),(56,11,5,14,'Final',3,'2024-10-14'),(57,11,5,15,'Final',3,'2024-10-14'),(58,11,5,16,'Final',3,'2024-10-14'),(59,11,5,17,'Final',3,'2024-10-14'),(60,12,5,1,'Initial',0,'2024-10-16'),(61,13,5,1,'Final',3,'2024-10-16'),(62,14,5,1,'Final',3,'2024-10-16'),(63,15,5,1,'Final',3,'2024-10-16'),(64,16,5,1,'Final',3,'2024-10-16'),(65,17,5,1,'Final',3,'2024-10-16'),(66,17,5,2,'Final',3,'2024-10-16'),(67,17,5,4,'Final',3,'2024-10-16'),(68,17,5,5,'Final',3,'2024-10-16'),(69,17,5,6,'Final',3,'2024-10-16'),(70,17,5,7,'Final',3,'2024-10-16'),(71,17,5,8,'Final',3,'2024-10-16'),(72,17,5,9,'Final',3,'2024-10-16'),(73,17,5,10,'Final',3,'2024-10-16'),(74,17,5,11,'Final',3,'2024-10-16'),(75,17,5,12,'Final',3,'2024-10-16'),(76,17,5,13,'Final',3,'2024-10-16'),(77,17,5,14,'Final',3,'2024-10-16'),(78,17,5,15,'Final',3,'2024-10-16'),(79,17,5,16,'Final',3,'2024-10-16'),(80,17,5,17,'Final',3,'2024-10-16'),(81,18,5,1,'Final',3,'2024-10-16'),(82,18,5,2,'Final',3,'2024-10-16'),(83,18,5,4,'Final',3,'2024-10-16'),(84,18,5,5,'Final',3,'2024-10-16'),(85,18,5,6,'Final',3,'2024-10-16'),(86,18,5,7,'Final',3,'2024-10-16'),(87,18,5,8,'Final',3,'2024-10-16'),(88,18,5,9,'Final',3,'2024-10-16'),(89,18,5,10,'Final',3,'2024-10-16'),(90,18,5,11,'Final',3,'2024-10-16'),(91,18,5,12,'Final',3,'2024-10-16'),(92,18,5,13,'Final',3,'2024-10-16'),(93,18,5,14,'Final',3,'2024-10-16'),(94,18,5,15,'Final',3,'2024-10-16'),(95,18,5,16,'Final',3,'2024-10-16'),(96,18,5,17,'Final',3,'2024-10-16'),(97,18,6,3,'Final',3,'2024-10-16'),(98,18,6,18,'Final',3,'2024-10-16'),(99,18,6,19,'Final',3,'2024-10-16'),(100,18,6,20,'Final',3,'2024-10-16'),(101,18,6,21,'Final',3,'2024-10-16'),(102,18,6,22,'Final',3,'2024-10-16'),(103,18,6,23,'Final',3,'2024-10-16'),(104,18,6,24,'Final',3,'2024-10-16'),(105,19,5,1,'Final',2,'2024-10-15'),(106,19,5,2,'Final',2,'2024-10-15'),(107,19,5,4,'Final',2,'2024-10-15'),(108,19,5,5,'Final',2,'2024-10-15'),(109,19,5,6,'Final',2,'2024-10-15'),(110,19,5,7,'Final',2,'2024-10-15'),(111,19,5,8,'Final',2,'2024-10-15'),(112,19,5,9,'Final',2,'2024-10-15'),(113,19,5,10,'Final',2,'2024-10-15'),(114,19,5,11,'Final',2,'2024-10-15'),(115,19,5,12,'Final',2,'2024-10-15'),(116,19,5,13,'Final',2,'2024-10-15'),(117,19,5,14,'Final',2,'2024-10-15'),(118,19,5,15,'Final',2,'2024-10-15'),(119,19,5,16,'Final',2,'2024-10-15'),(120,19,5,17,'Final',2,'2024-10-15'),(121,19,6,3,'Final',2,'2024-10-15'),(122,19,6,18,'Final',2,'2024-10-15'),(123,19,6,19,'Final',2,'2024-10-15'),(124,19,6,20,'Final',2,'2024-10-15'),(125,19,6,21,'Final',2,'2024-10-15'),(126,19,6,22,'Final',1,'2024-10-15'),(127,19,6,23,'Final',1,'2024-10-15'),(128,19,6,24,'Final',1,'2024-10-15');
/*!40000 ALTER TABLE `assessment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18 22:32:49
