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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `imagepath` varchar(100) DEFAULT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'member',
  `createdby` varchar(45) NOT NULL,
  `modifiedby` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `username` (`username`),
  KEY `role_idx` (`role`),
  CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `roles` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=1008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1001,'rana.mansoor','rana_shahan@hotmail.com','$2a$10$FWWiAVrixnZDMIZZtaL2w.0ixYISWjAK7qSxG7SATlS6YvyQFxaIq','Rana Mansoor Ahmed','119-222-3333','Consulttrain','Safety Engineer',NULL,'admin','rana.mansoor','rana.mansoor','2024-10-02 11:10:08','2024-10-02 21:55:11'),(1002,'fareeha.naeem','fareeha.naeem@hotmail.com','$2a$10$L/77qzBVqTVomQ44JQcszuRoSOxaIBkVIfHZsVFiXkK4A4yoqM6Ga','Fareeha Naeem',NULL,NULL,NULL,NULL,'staff','fareeha.naeem','fareeha.naeem','2024-10-02 11:10:08','2024-10-02 11:10:31'),(1003,'rana.test','rana.test01@quality.com','$2a$10$EznwQY8xCFr0lN1mPxUJjudMVu0d5C2TxZraPeoZRfciOWNC6hk7a','rana test','0300-333-3333','Consult & Train','Safety Engineerr',NULL,'admin','rana.test','rana.test','2024-10-02 18:42:51','2024-10-02 18:42:51'),(1006,'rana.test02','rana.test02@quality.com','$2a$10$14.chx5XwC0v128dwjsoF.r.XZ23VwB.pN3p2CK4UFZy5rVe8.Jqe','rana test','0300-333-3333','Consult & Train','Sefety engr.',NULL,'guest','rana.test02','rana.test02','2024-10-02 19:08:46','2024-10-02 19:08:46'),(1007,'rana.test03','rana.test03@quality.com','$2a$10$NwdWnqWzncIwOkVeuWDos.CeRKgxwqiIaftbc..wx8i2DesT074xy','rana test','0300-333-3333','Consult & Train','Safety Engineer',NULL,'member','rana.test03','rana.test03','2024-10-02 19:11:39','2024-10-02 19:11:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-03  3:58:15
