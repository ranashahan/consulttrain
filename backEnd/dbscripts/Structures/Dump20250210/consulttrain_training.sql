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
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `courseid` int DEFAULT NULL,
  `categoryid` int DEFAULT NULL,
  `plandate` date DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `titleid` int DEFAULT NULL,
  `clientid` int DEFAULT NULL,
  `contractorid` int DEFAULT NULL,
  `trainerid` int DEFAULT NULL,
  `trainingexpiry` date DEFAULT NULL,
  `invoicenumber` varchar(100) DEFAULT NULL,
  `invoicedate` date DEFAULT NULL,
  `charges` int DEFAULT NULL,
  `transportation` int DEFAULT NULL,
  `miscexpense` int DEFAULT NULL,
  `tax` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `cheque` varchar(255) DEFAULT NULL,
  `amountreceived` int DEFAULT NULL,
  `requestedby` varchar(255) DEFAULT NULL,
  `contactnumber` varchar(255) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `locationid` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `classroom` int DEFAULT NULL,
  `assessment` int DEFAULT NULL,
  `commentry` int DEFAULT NULL,
  `active` int DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trainCreatedby_idx` (`createdby`),
  KEY `trainModifiedby_idx` (`modifiedby`),
  KEY `trainTitleid_idx` (`titleid`),
  KEY `trainTrainerid_idx` (`trainerid`),
  KEY `trainClientid_idx` (`clientid`),
  KEY `trainContractorid_idx` (`contractorid`),
  KEY `trainLocationid_idx` (`locationid`),
  KEY `trainCourseid_idx` (`courseid`),
  KEY `trainCategoryid_idx` (`categoryid`),
  CONSTRAINT `trainCategoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`),
  CONSTRAINT `trainClientid` FOREIGN KEY (`clientid`) REFERENCES `client` (`id`),
  CONSTRAINT `trainContractorid` FOREIGN KEY (`contractorid`) REFERENCES `contractor` (`id`),
  CONSTRAINT `trainCourseid` FOREIGN KEY (`courseid`) REFERENCES `course` (`id`),
  CONSTRAINT `trainCreatedby` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `trainLocationid` FOREIGN KEY (`locationid`) REFERENCES `location` (`id`),
  CONSTRAINT `trainModifiedby` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`),
  CONSTRAINT `trainTitleid` FOREIGN KEY (`titleid`) REFERENCES `title` (`id`),
  CONSTRAINT `trainTrainerid` FOREIGN KEY (`trainerid`) REFERENCES `trainer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10  3:23:57
