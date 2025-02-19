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
-- Table structure for table `session_trainer`
--

DROP TABLE IF EXISTS `session_trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_trainer` (
  `session_id` int NOT NULL,
  `trainer_id` int NOT NULL,
  PRIMARY KEY (`session_id`,`trainer_id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `session_trainer_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE,
  CONSTRAINT `session_trainer_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_trainer`
--

LOCK TABLES `session_trainer` WRITE;
/*!40000 ALTER TABLE `session_trainer` DISABLE KEYS */;
INSERT INTO `session_trainer` VALUES (8,2001),(9,2001),(11,2001),(20,2001),(36,2001),(41,2001),(42,2001),(43,2001),(56,2001),(58,2001),(64,2001),(65,2001),(66,2001),(68,2001),(4,2002),(6,2002),(7,2002),(10,2002),(12,2002),(13,2002),(14,2002),(15,2002),(16,2002),(17,2002),(18,2002),(27,2002),(29,2002),(30,2002),(31,2002),(37,2002),(40,2002),(44,2002),(49,2002),(54,2002),(55,2002),(57,2002),(62,2002),(63,2002),(69,2002),(70,2002),(4,2003),(5,2003),(32,2003),(33,2003),(34,2003),(45,2003),(53,2003),(59,2003),(38,2004),(39,2004),(46,2004),(47,2004),(48,2004),(50,2004),(51,2004),(52,2004),(61,2004),(67,2004);
/*!40000 ALTER TABLE `session_trainer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-20  2:29:25
