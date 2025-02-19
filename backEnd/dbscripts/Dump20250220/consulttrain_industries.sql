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
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `ind_createdby_fk_idx` (`createdby`),
  KEY `ind_modifiedby_fk_idx` (`modifiedby`),
  CONSTRAINT `ind_createdby_fk` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),
  CONSTRAINT `ind_modifiedby_fk` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'Textile Industry','The largest manufacturing sector, contributing significantly to exports and employment',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(2,'Food Processing Industry','Includes dairy, meat, fruits, and vegetables',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(4,'Information Technology','Rapidly growing sector with software development, e-commerce, and IT-enabled services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(5,'Agriculture Industry','Major producer of wheat, cotton, sugarcane, and various fruits',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(6,'Automobile Industry','Includes manufacturing of cars, motorcycles, and auto parts',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(7,'Cement Industry','Significant for construction and infrastructure development',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(8,'Steel Industry','Produces steel products for various sectors',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(9,'Mining Industry','Extraction of minerals like coal, salt, and gemstones',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(10,'Pharmaceutical Industry','Produces a wide range of medicines and healthcare products',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(11,'Construction Industry','Involves building infrastructure and real estate',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(12,'Electronics Industry','Manufacturing of electronic goods and components',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(13,'Leather Industry','Production of leather goods and accessories',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(14,'Sports Goods Industry','Manufacturing of sports equipment and apparel',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(15,'Surgical Instruments Industry','Production of medical and surgical instruments',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(16,'Furniture Industry','Manufacturing of household and office furniture',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(17,'Paper and Paperboard Industry','Production of paper products and packaging materials',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(18,'Plastic Industry','Manufacturing of plastic products and materials',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(19,'Rubber Industry','Production of rubber goods and components',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(20,'Glass Industry','Manufacturing of glass products and materials',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(21,'Ceramics Industry','Production of ceramic goods and materials',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(23,'Petroleum Industry','Refining of crude oil into various petroleum products',1001,1001,'2025-02-18 09:51:15','2025-02-19 15:00:32'),(24,'Energy Industry','Production and distribution of energy',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(25,'Telecommunications Industry','Provision of telecommunication services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(26,'Tourism Industry','Services related to travel and tourism',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(27,'Banking and Finance Industry','Provision of financial services and banking',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(28,'Insurance Industry','Provision of insurance services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(29,'Real Estate Industry','Development and sale of real estate properties',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(30,'Logistics and Transportation Industry','Provision of transportation and logistics services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(31,'Education Industry','Provision of educational services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(32,'Healthcare Industry','Provision of healthcare services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(33,'Entertainment Industry','Production and distribution of entertainment content',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(34,'Media and Publishing Industry','Production and distribution of media and publications',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(35,'Retail Industry','Sale of goods to consumers',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(36,'Hospitality Industry','Provision of hospitality services',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(37,'Fishing Industry','Harvesting of fish and seafood',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(38,'Forestry Industry','Management and harvesting of forests',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(39,'Handicrafts Industry','Production of handmade goods',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(40,'Jewelry Industry','Manufacturing of jewelry and accessories',1001,1001,'2025-02-18 09:51:15','2025-02-18 09:51:15'),(42,'Tobacco Industry','Manufacturing of tobacco products',1001,1001,'2025-02-18 12:59:31','2025-02-18 12:59:31');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-20  2:29:27
