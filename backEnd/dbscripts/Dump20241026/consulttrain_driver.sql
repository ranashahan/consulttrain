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
  `dob` date DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `nicexpiry` date DEFAULT NULL,
  `licensenumber` varchar(255) DEFAULT NULL,
  `licensetypeid` int DEFAULT NULL,
  `licenseexpiry` date DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `permitnumber` varchar(255) DEFAULT NULL,
  `permitissue` date DEFAULT NULL,
  `permitexpiry` date DEFAULT NULL,
  `bloodgroupid` int DEFAULT NULL,
  `contractorid` int DEFAULT NULL,
  `visualid` int DEFAULT NULL,
  `ddccount` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `active` int NOT NULL DEFAULT '1',
  `createdby` int NOT NULL,
  `modifiedby` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
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
) ENGINE=InnoDB AUTO_INCREMENT=20030 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (20021,'Muhammad Khan Rajput','1980-06-25','41103-0237290-5','2028-01-01','QA-88325',4001,'2026-10-13','Safety Engineer','testing','CONT-993','2024-09-25','2026-09-25',3002,5010,11001,7,2,'testing comments',1,1001,1001,'2024-09-25 09:42:22','2024-10-16 16:44:02'),(20022,'Muhammad Hassan Khan','2006-02-25','41103-0244290-5',NULL,'QA-88955',4003,'2026-02-25','Safety Engineer','testing 1','CONT-993','2024-09-25','2026-09-25',3001,5011,NULL,3,2,NULL,1,1001,1001,'2024-09-25 11:34:08','2024-10-02 22:51:53'),(20023,'Test Driver 5','1990-09-20','42201-0237460-6','2027-01-01','QA-83525',4002,'2025-09-15','qa','testing','CONT-2831','2024-09-15','2026-09-15',3002,5011,NULL,0,0,NULL,1,1001,1001,'2024-09-26 17:21:47','2024-10-09 11:21:27'),(20024,'John doe','1981-09-09','41103-0237232-5','2026-01-01','QA-88331',4002,'2026-01-01','Safety manager','Quality Control','CONT-996','2024-10-05','2026-10-05',3001,5015,11003,2,2,'This is my comments for verification',1,1001,1001,'2024-10-05 17:30:01','2024-10-13 22:34:46'),(20025,'John doe jr','1982-01-01','41103-0237230-5','2027-01-01','QA-88326',4004,'2027-01-01','Safety manager','Quality Control','CONT-943','2024-10-05','2026-10-05',3002,5015,11002,2,2,'this is my comments',1,1001,1001,'2024-10-05 17:33:48','2024-10-16 16:50:11'),(20026,'John doe sr','1996-02-06','41103-0237234-5','2025-01-06','QA-88329',4006,'2025-11-05','Safety manager','testing','CONT-995','2024-10-06','2026-10-06',3002,5018,11001,4,1,'this is my dummy comment',1,1001,1001,'2024-10-05 17:36:35','2024-10-25 21:40:02'),(20027,'Ewan Willoughey','1979-01-01','41103-0237243-5','2028-01-01','QA-88327',4003,'2027-01-01','Safety manager','Quality Control','CONT-995','2024-10-05','2026-10-05',3001,5011,11002,1,2,'this is example comments for the driver which contain dummy data and not use for any commercial use.',1,1001,1001,'2024-10-05 18:27:46','2024-10-11 16:29:56'),(20028,'Jason Bourne','1983-06-25','41103-0237297-5','2027-01-01','QA-88332',4006,'2025-09-15','Safety manager','Quality Control','CONT-289233','2024-09-15','2026-09-15',3002,5024,11001,1,0,'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',1,1001,1001,'2024-10-05 18:34:53','2024-10-22 13:43:16'),(20029,'Rana PRO',NULL,'41103-0244551-5',NULL,'QA-88335',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,1,1001,1001,'2024-10-18 14:58:36','2024-10-19 16:41:45');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `set_expiry_date` BEFORE INSERT ON `driver` FOR EACH ROW SET NEW.permitexpiry = DATE_ADD(NEW.permitissue, INTERVAL 2 YEAR) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26  3:15:26
