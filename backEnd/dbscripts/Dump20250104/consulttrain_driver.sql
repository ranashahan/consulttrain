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
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `nicexpiry` date DEFAULT NULL,
  `licensenumber` varchar(255) DEFAULT NULL,
  `licensetypeid` int DEFAULT NULL,
  `licenseexpiry` date DEFAULT NULL,
  `licenseverified` tinyint(1) NOT NULL DEFAULT '1',
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `permitnumber` varchar(255) NOT NULL,
  `permitissue` date DEFAULT NULL,
  `permitexpiry` date DEFAULT NULL,
  `medicalexpiry` date DEFAULT NULL,
  `bloodgroupid` int DEFAULT NULL,
  `contractorid` int DEFAULT NULL,
  `visualid` int DEFAULT NULL,
  `ddccount` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permitnumber_UNIQUE` (`permitnumber`),
  KEY `bloodgroup_fk_idx` (`bloodgroupid`),
  KEY `licensetype_fk_idx` (`licensetypeid`),
  KEY `createdby_fk_idx` (`createdby`),
  KEY `modifiedby_fk_idx` (`modifiedby`),
  KEY `contractor_fk_idx` (`contractorid`),
  KEY `visualid_fk_idx` (`visualid`),
  KEY `nic` (`nic`),
  CONSTRAINT `bloodgroup_fk` FOREIGN KEY (`bloodgroupid`) REFERENCES `bloodgroup` (`id`),
  CONSTRAINT `contractor_fk` FOREIGN KEY (`contractorid`) REFERENCES `contractor` (`id`),
  CONSTRAINT `createdby_fk` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `licensetype_fk` FOREIGN KEY (`licensetypeid`) REFERENCES `licensetype` (`id`),
  CONSTRAINT `modifiedby_fk` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`),
  CONSTRAINT `visualid_fk` FOREIGN KEY (`visualid`) REFERENCES `visual` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20065 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (20021,'Muhammad Khan Rajput',NULL,'1980-06-25','41103-0237290-5','2028-01-01','QA-88325',4001,'2024-10-13',1,'Safety Engineer','testing','CNTD-000003','2024-09-25','2024-09-25',NULL,3002,5011,11001,13,2,NULL,'testing comments',1,1001,1001,'2024-09-25 09:42:22','2024-12-21 08:56:11'),(20022,'Muhammad Hassan Khan',NULL,'2006-02-25','41103-0244290-5',NULL,'QA-88955',4003,'2026-02-25',1,'Safety Engineer','testing 1','CNTD-000004','2024-09-25','2026-09-25',NULL,3001,5011,NULL,3,2,NULL,NULL,1,1001,1001,'2024-09-25 11:34:08','2024-12-21 08:56:25'),(20023,'Test Driver 5',NULL,'1990-09-20','42201-0237460-6','2027-01-01','QA-83525',4002,'2025-09-15',1,'qa','testing','CNTD-000011','2024-09-15','2026-09-15',NULL,3002,5011,NULL,0,0,NULL,NULL,0,1001,1001,'2024-09-26 17:21:47','2024-12-21 09:03:27'),(20024,'John doe',NULL,'1981-09-09','41103-0237232-5','2026-01-01','QA-88331',4002,'2026-01-01',1,'Safety manager','Quality Control','CNTD-000009','2024-10-05','2026-10-05',NULL,3001,5015,11003,3,2,NULL,'This is my comments for verification',1,1001,1001,'2024-10-05 17:30:01','2024-12-21 08:58:24'),(20025,'John doe jr',NULL,'1982-01-01','41103-0237230-5','2027-01-01','QA-88326',4004,'2027-01-01',1,'Safety manager','Quality Control','CNTD-000010','2024-10-05','2026-10-05',NULL,3002,5015,11002,4,2,NULL,'this is my comments',1,1001,1001,'2024-10-05 17:33:48','2024-12-21 09:00:37'),(20026,'John doe sr',NULL,'1996-02-06','41103-0237234-5','2025-01-06','QA-88329',4006,'2025-11-05',1,'Safety manager','testing','CNTD-000007','2024-10-06','2026-10-06',NULL,3002,5018,11001,5,1,NULL,'this is my dummy comment',1,1001,1001,'2024-10-05 17:36:35','2024-12-21 08:57:49'),(20027,'Ewan Willoughey','Male','1979-01-01','41103-0237243-5','2028-01-01','QA-88327',4002,'2027-01-01',1,'Safety manager','Quality Control','CNTD-000008','2024-10-05','2026-10-05','2024-12-31',3001,5011,11002,4,2,NULL,'this is example comments for the driver which contain dummy data and not use for any commercial use.',1,1001,1001,'2024-10-05 18:27:46','2024-12-27 20:50:58'),(20028,'Jason Bourne','Male','1983-06-25','41103-0237297-5','2027-01-01','QA-88332',4006,'2025-09-15',1,'Safety manager','Quality Control','CONT-289233','2024-09-15','2026-09-15',NULL,3002,5024,11001,1,0,NULL,'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',1,1001,1001,'2024-10-05 18:34:53','2025-01-02 18:06:46'),(20029,'Rana PRO Test',NULL,NULL,'41103-0244551-5',NULL,'QA-88335',NULL,NULL,1,NULL,NULL,'CNTD-000023',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,1001,1001,'2024-10-18 14:58:36','2024-12-21 09:09:58'),(20030,'Rana delete test one',NULL,NULL,'41103-0232320-5',NULL,'QA-883335',NULL,NULL,1,'','','CNTD-000018',NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'',0,1001,1001,'2024-10-29 08:30:20','2024-12-21 09:08:54'),(20031,'Rana delete test two',NULL,NULL,'41103-0244343-5',NULL,'QA-84445',NULL,NULL,1,'','','CNTD-000019',NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'',0,1001,1001,'2024-10-29 12:58:35','2024-12-21 09:09:04'),(20032,'Rana delete test three',NULL,NULL,'41103-0239930-5',NULL,'QA-88395',NULL,NULL,1,'','','CNTD-000020',NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'',0,1001,1001,'2024-10-29 12:59:52','2024-12-21 09:09:17'),(20033,'Rana delete tset four',NULL,NULL,'41103-0232320-5',NULL,'QA-88399',NULL,NULL,1,'','','CNTD-000021',NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,'',0,1001,1001,'2024-10-29 13:01:33','2024-12-21 09:09:30'),(20034,'Rana delete test five',NULL,NULL,'41103-0233490-5',NULL,'QA-88325334',NULL,NULL,1,'','','CNTD-000022',NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,'',1,1001,1001,'2024-10-29 23:07:41','2024-12-21 09:09:39'),(20035,'Rana Test search',NULL,'1991-01-01','42201-5558882-3','2024-12-31','QA-883251',4002,'2025-01-17',1,'','','CONT-91211','2024-11-04','2026-11-04',NULL,3003,5010,11003,1,1,NULL,'',1,1001,1001,'2024-11-04 14:09:26','2024-11-14 09:40:09'),(20036,'Rana test driver code',NULL,'1991-01-01','41103-0237299-5','2028-01-01','QA-88009',4002,'2025-01-01',1,'Safety manager','Quality Control','CNTD-000005','2024-11-06','2026-11-06',NULL,3001,5010,11001,1,6,'STC-CT-011','This is driver comments for testing',1,1001,1001,'2024-11-06 13:51:45','2024-12-21 08:56:38'),(20037,'Rana after cache','Female','1951-01-01','41103-0239990-5','2026-01-01','QA-9933221',4001,'2026-12-31',1,'Safety manager','Quality Control','CONT-994','2024-11-15','2026-11-15',NULL,3001,5010,11001,1,10,'STC-CT-011','This is verification of driver after implementation of cache',1,1001,1001,'2024-11-15 14:38:38','2025-01-02 22:58:19'),(20038,'Faiz Ahmed','Male','1992-12-03','42201-5948872-2','2028-12-02','12000000009',4002,'2028-09-02',1,'Safety manager','Quality Control','KTS-123-67','2024-11-22','2026-11-22',NULL,3006,5011,NULL,0,12,'WH10023','test',1,1002,1001,'2024-11-22 06:33:33','2024-11-29 19:49:19'),(20039,'Driver test expiry',NULL,'1999-01-01','42201-5948882-2','2024-11-28','QA-88343325',4002,'2024-11-28',1,'test','test','CNTD-000006','2024-11-28','2026-11-28',NULL,3002,5013,11001,2,0,'STC-CT-011','',1,1001,1001,'2024-11-28 07:42:25','2024-12-21 08:56:50'),(20040,'tes testt es',NULL,NULL,'41103-0233430-5',NULL,'QA-8834343',NULL,NULL,2,'','','CNTD-000013',NULL,NULL,NULL,NULL,NULL,NULL,0,0,'','',1,1001,1001,'2024-11-28 13:22:34','2024-12-21 09:07:36'),(20041,'tes tes test',NULL,NULL,'41343-0223390-5',NULL,'QA-83434325',NULL,NULL,2,'','','CNTD-000014',NULL,NULL,NULL,NULL,NULL,NULL,0,0,'','',1,1001,1001,'2024-11-28 13:23:27','2024-12-21 09:07:45'),(20042,'test with free',NULL,NULL,'41103-0234347-5',NULL,'QA-883253434',NULL,NULL,2,'','','CNTD-000015',NULL,NULL,NULL,NULL,NULL,11003,0,0,'','',1,1001,1001,'2024-11-28 17:31:59','2024-12-21 09:07:53'),(20043,'test gender','Not Specified','1991-01-01','41343-0237290-5',NULL,'QA-88334125',NULL,NULL,1,'','','CNTD-000016',NULL,NULL,NULL,NULL,5010,NULL,0,0,'','',1,1001,1001,'2024-11-29 18:51:08','2024-12-21 09:08:02'),(20044,'Test full','Male','1992-01-01','41103-0231230-5','2025-01-01','CIA-202022',4001,'2025-01-01',2,'Safety manager','Quality Control','CNTD-000012','2022-11-30','2024-11-30',NULL,3001,5012,11001,0,12,'STC-CT-001','THis is the testing driver please do not use it for commercial purpose.',1,1001,1001,'2024-11-29 20:03:16','2024-12-21 09:03:56'),(20045,'testing verification','Male','1972-12-31','41103-0237540-5','2025-12-31','QA-8654631',4002,'2024-12-31',2,'Safety manager','Quality Control','CONT-993','2024-12-07','2026-12-07',NULL,3001,5010,11003,0,7,'STC-CT-0111','Testing comment with driver verification',1,1001,1001,'2024-12-06 22:34:18','2024-12-06 22:34:18'),(20046,'Again verification','Male',NULL,'41103-0237383-5','2024-12-31','QA-882345',4002,NULL,1,'Safety manager','Quality Control','CONT-996','2024-12-07','2026-12-07','2024-12-21',3002,5010,11001,0,33,'STC-CT-0111','test',1,1001,1001,'2024-12-06 22:43:42','2024-12-22 23:08:21'),(20047,'test again verified','Male','1984-12-31','41103-0243470-5','2025-12-31','QA-883234',4002,'2024-12-31',1,'Safety manager','Quality Control','CONT-995','2024-12-31','2026-12-31',NULL,3002,5010,11001,0,16,'STC-CT-0111','test',1,1001,1001,'2024-12-06 22:46:45','2024-12-06 22:46:45'),(20048,'Rana Signal Driver','Male','1970-12-15','41133-0977290-5','2025-12-15','QA-8343425',4005,'2025-12-15',2,'Safety manager','Quality Control','CNTD-000002','2022-12-15','2026-12-14',NULL,3002,5010,11002,2,10,'STC-CT-0111','this is first driver with signal implmentation',1,1001,1010,'2024-12-14 22:11:08','2024-12-21 08:55:42'),(20049,'John doe sr','Male','2024-12-17','41103-0233290-6',NULL,'QA-83425',4002,'2026-12-17',2,'','','CNTD-000017',NULL,NULL,NULL,NULL,5027,NULL,0,0,'','',1,1001,1010,'2024-12-16 21:06:58','2024-12-21 09:08:29'),(20050,'Wazeer','Male',NULL,'44206-2422639-5',NULL,'750',4001,'2025-02-14',1,'','','CONT-7895',NULL,NULL,NULL,3004,5011,NULL,2,0,'','',1,1010,1010,'2024-12-18 11:23:15','2024-12-18 11:52:03'),(20051,'Rana Test Export','Male','1972-12-31','41103-0235864-5','2025-12-31','QA-898755',4002,'2025-12-31',2,'Safety manager','Quality Control','CNTD-000001','2024-12-20','2026-12-20',NULL,3008,5026,11002,1,6,'WH10023','test',1,1001,1001,'2024-12-20 18:50:47','2024-12-21 08:54:30'),(20052,'Rana Test Permit','Male','1979-12-31','41103-0237021-5','2026-12-31','QA-889356',4002,'2026-12-31',2,'Safety manager','Quality Control','CNTD-000000',NULL,NULL,NULL,3002,5011,11003,0,19,'STC-CT-002','testing driver with permit autogenerated.',1,1001,1001,'2024-12-21 09:14:02','2024-12-21 09:14:02'),(20061,'Rana Test Permit1','Not Specified','1957-12-21','41103-6787234-5','2025-01-21','QA-88955265',4001,'2025-01-22',2,'Safety manager','Quality Control','CNTD-000033','2024-12-22','2026-12-23',NULL,3007,5026,11001,1,13,'STC-CT-002343','sp insert',1,1001,1001,'2024-12-21 10:49:33','2024-12-21 10:51:38'),(20062,'Rana Test Permit 02','Male','1972-12-31','41103-0232343-5','2025-12-31','QA-88331234324',4002,'2026-12-31',2,'','','CNTD-000034','2024-12-21','2026-12-21',NULL,NULL,5010,NULL,0,0,'','',1,1001,1001,'2024-12-21 10:58:02','2024-12-21 10:58:02'),(20063,'Rana Test Medical','Male','1960-12-31','41103-0897990-5','2027-12-31','QA-883319235',4005,'2024-12-31',2,'Safety manager','Quality Control','CNTD-000035','2024-12-21','2026-12-21','2025-12-31',3003,5010,11003,1,14,'STC-CT-00234','This is medical test',1,1001,1001,'2024-12-21 13:55:56','2024-12-21 13:55:56'),(20064,'Rana Test Medical min',NULL,NULL,'43434-0244290-3',NULL,'QA-8895523434',NULL,NULL,1,NULL,NULL,'CNTD-000036','2024-12-21','2026-12-21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1001,1001,'2024-12-21 13:57:33','2024-12-21 13:57:33');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-04 22:24:07
