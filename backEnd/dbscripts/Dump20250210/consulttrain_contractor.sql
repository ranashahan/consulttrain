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
-- Table structure for table `contractor`
--

DROP TABLE IF EXISTS `contractor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contractor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ntnnumber` varchar(100) DEFAULT NULL,
  `contactname` varchar(255) DEFAULT NULL,
  `contactnumber` varchar(100) DEFAULT NULL,
  `contactdesignation` varchar(100) DEFAULT NULL,
  `contactdepartment` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `initials` varchar(45) DEFAULT NULL,
  `clientid` int NOT NULL,
  `active` int DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Ccreatedby_idx` (`createdby`),
  KEY `Cmodifiedby_idx` (`modifiedby`),
  KEY `Cclientid_idx` (`clientid`),
  CONSTRAINT `Cclientid` FOREIGN KEY (`clientid`) REFERENCES `client` (`id`),
  CONSTRAINT `Ccreatedby` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `Cmodifiedby` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=5030 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractor`
--

LOCK TABLES `contractor` WRITE;
/*!40000 ALTER TABLE `contractor` DISABLE KEYS */;
INSERT INTO `contractor` VALUES (5010,'AMCORP',NULL,NULL,'0300-222-2222',NULL,NULL,NULL,'This is dummy address Karachi, Pakistan','AMC',1,1,1001,1001,'2024-09-19 14:44:26','2024-11-26 15:58:04'),(5011,'A. B. Nizamani',NULL,'234234','0300-222-2222','234234324','test1','test1','This is dummy address Karachi, Pakistan','ABC',1,1,1001,1001,'2024-09-19 14:46:15','2024-11-26 15:58:04'),(5012,'AMCORP1',NULL,NULL,'0300-222-2222',NULL,NULL,NULL,'This is dummy address Karachi, Pakistan','AMC',1,1,1001,1001,'2024-09-19 14:52:08','2024-11-26 15:58:04'),(5013,'XXYYzz',NULL,NULL,'0300-2829229',NULL,NULL,NULL,'A-19/1, Block-14, GJ','RMA',6,1,1001,1001,'2024-09-30 20:57:36','2024-11-26 21:05:28'),(5014,'rara',NULL,NULL,'0300-2829229',NULL,NULL,NULL,'A-19/1, Block-14, GJ','RMA',1,1,1001,1001,'2024-09-30 21:02:25','2024-11-26 15:58:04'),(5015,'asdfsd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1001,1001,'2024-09-30 21:03:00','2024-11-26 15:58:04'),(5016,'ddffdd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1001,1001,'2024-09-30 21:05:18','2024-11-26 15:58:04'),(5017,'AMCORP2',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC2',1,1,1001,1001,'2024-09-30 21:39:14','2024-11-26 15:58:04'),(5018,'AMCORP3',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC3',1,1,1001,1001,'2024-09-30 21:41:03','2024-11-26 15:58:04'),(5019,'AMCORP4',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC4',1,1,1001,1001,'2024-09-30 21:41:28','2024-11-26 15:58:04'),(5020,'AMCORP5',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC5',1,1,1001,1001,'2024-09-30 21:41:58','2024-11-26 15:58:04'),(5021,'AMCORP6',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC6',1,1,1001,1001,'2024-09-30 21:42:52','2024-11-26 15:58:04'),(5022,'ds ads fsaf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1001,1001,'2024-09-30 22:54:14','2024-11-26 15:58:04'),(5023,'AMCORP7',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC7',1,1,1001,1001,'2024-09-30 22:57:51','2024-11-26 15:58:04'),(5024,'  asdf asdf sdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1001,1001,'2024-09-30 23:02:20','2024-11-26 15:58:04'),(5025,'test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1001,1001,'2024-11-23 12:05:47','2024-11-26 15:58:04'),(5026,'AMCORP9',NULL,'NTN-2002332','Mr. Badsha','0300-2999999','HRC Manager','Travel Safety','This is dummy address Karachi, Pakistan','AMC9',8,1,1001,1001,'2024-11-26 16:22:04','2024-11-26 16:26:50'),(5027,'Shaheen Frieght',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,1,1001,1001,'2024-11-26 21:00:40','2024-11-26 21:00:40'),(5028,'test1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,1,1001,1001,'2024-11-26 21:01:35','2024-11-26 21:01:35'),(5029,'test test 33',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,1,1001,1001,'2024-12-01 13:15:15','2024-12-01 13:15:15');
/*!40000 ALTER TABLE `contractor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10  3:22:58
