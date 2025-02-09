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

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` VALUES (1,'Training Testing1',NULL,NULL,'2024-12-04','2024-12-04','2024-12-12','15 hrs',9001,1,5011,2002,'2024-12-12','test-01','2024-12-12',2,2,2,2,8,'Alfalah','C280029',8,'Danyal Khan','0300-2020220','Internal','Training room',6001,'Open',2,2,2,1,1001,1001,'2024-12-04 09:50:47','2024-12-28 15:09:58'),(2,'Training Testing2',NULL,NULL,'2024-12-04','2024-12-04','2024-12-12','15 hrs',9001,1,5011,2002,'2024-12-12','test-01','2024-12-12',2,2,2,2,8,'Alfalah','C280099',8,'Danyal Khan','0300-2020220','Internal','Training room',6001,'New',2,2,2,1,1001,1001,'2024-12-04 11:44:57','2024-12-04 11:45:16'),(3,'test',NULL,NULL,'2024-12-04','2024-12-04','2024-12-04','16 hrs',9002,5,5011,2002,'2024-12-04','B-20002','2024-12-04',80000,12000,NULL,4600,96600,'AlFlah','ch-20024',96600,'Kamran Khan','0300-2000900','Internal','training room',6001,'Completed',2,1,1,1,1001,1001,'2024-12-04 12:20:13','2024-12-10 19:05:18'),(4,'test-0101',NULL,NULL,'2024-12-04','2024-12-04','2024-12-04',NULL,NULL,NULL,NULL,2002,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'New',1,1,1,0,1001,1001,'2024-12-04 12:23:00','2024-12-07 18:28:03'),(5,'test-0102',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2002,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Open',2,2,2,1,1001,1001,'2024-12-04 12:23:32','2024-12-07 17:39:54'),(6,'test-0103',NULL,NULL,'2024-12-04','2024-12-04','2024-12-04','16hrs',9002,8,5011,2002,'2024-12-04','Test-0103','2024-12-19',80000,12000,NULL,4600,NULL,'MCB','ch-20025',96600,'Kamran Khan','0300-2000900','Internal','training room',6001,'New',1,2,1,1,1001,1001,'2024-12-04 15:39:49','2024-12-04 15:39:49'),(7,'test-0104',NULL,NULL,'2024-12-04','2024-12-04','2024-12-25','16 hrs',9001,6,5011,2002,'2026-12-04','Test-0104','2024-12-05',80000,12000,NULL,4600,96600,'MCB','ch-20024',96600,'Kamran Khan','0300-2000900','Internal','training room',6001,'New',1,2,2,1,1001,1001,'2024-12-04 16:03:20','2024-12-04 16:03:20'),(8,'My job status test',NULL,NULL,'2024-12-07','2024-12-07','2024-12-07','16 hrs',9002,5,5010,2002,'2024-12-07','B-20002','2024-12-07',82222,2232,232,4234,88920,'MCB','ch-20024',88920,'Kamran Khan','0300-2000900',NULL,'training room',6006,'New',1,2,1,1,1001,1001,'2024-12-07 17:35:04','2024-12-07 17:35:04'),(9,'Inprogress training',NULL,NULL,'2024-12-31','2024-12-31','2024-12-31','16 hrs',9002,8,5011,2003,'2024-12-31','Test-0104','2024-12-31',144554,12211,11221,8399,176385,'MCB','ch-20024',NULL,NULL,NULL,NULL,NULL,NULL,'Plan',2,2,2,1,1001,1001,'2024-12-07 17:42:31','2024-12-10 19:04:19'),(10,'Inprogress training1',NULL,NULL,'2024-12-31','2024-12-31','2024-12-31','16 hrs',9002,8,5010,2003,'2024-12-31','Test-0104','2024-12-31',786555,12332,123,39951,838961,'MCB','ch-20024',838960,NULL,NULL,'Internal','training room',6001,'InProgress',1,2,1,1,1001,1001,'2024-12-07 17:44:28','2024-12-07 17:44:28'),(11,'test Plan',3,2,'2024-12-31','2024-12-30','2024-12-31','16 hrs',9002,8,5011,2003,'2024-12-31','B-20002','2024-12-31',321321,20212,121,17083,358737,'MCB','ch-20024',358736,'Kamran Khan','0300-2000900','Internal','training room',6009,'InProgress',2,2,2,1,1001,1001,'2024-12-07 18:06:39','2024-12-21 21:01:48'),(12,'Test with Session',2,NULL,'2024-12-15','2024-12-15','2024-12-20','16 hrs',9002,6,5019,2001,'2024-12-31','Test-0104','2024-12-31',120000,25000,2000,7350,154350,'AlFlah','ch-20024',154350,'Kamran Khan','0300-2000900','Internal','training room',6003,'New',2,2,2,1,1001,1001,'2024-12-14 22:20:40','2024-12-21 20:50:12'),(13,'DDC-LV-001',4,NULL,'2024-12-18','2024-12-27','2024-12-28',NULL,9001,4,NULL,2002,NULL,NULL,'2024-12-31',40000,7000,17000,3200,67200,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Completed',2,2,2,1,1011,1001,'2024-12-18 11:58:17','2024-12-21 18:59:23'),(14,'test 234',2,2,'2024-12-22','2024-12-22','2024-12-22',NULL,NULL,NULL,NULL,2002,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'New',1,1,1,1,1001,1001,'2024-12-21 21:13:36','2024-12-21 21:13:36'),(15,'CNTT-20241123-1',2,2,'2024-12-23','2024-12-23','2024-12-25','16 hrs',9002,5,5029,2002,'2024-12-28',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'New',2,2,2,1,1001,1001,'2024-12-23 13:41:20','2024-12-23 13:44:52'),(16,'CNTT-20241223-1',2,2,'2024-12-23','2024-12-23','2024-12-28','16 hrs',9002,1,5011,2002,'2024-12-28',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6005,'New',1,1,1,1,1001,1001,'2024-12-23 13:45:52','2024-12-23 13:45:52');
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
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
