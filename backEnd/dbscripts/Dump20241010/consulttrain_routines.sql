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
-- Dumping events for database 'consulttrain'
--

--
-- Dumping routines for database 'consulttrain'
--
/*!50003 DROP PROCEDURE IF EXISTS `getAllBloodGroup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBloodGroup`()
BEGIN
select b.id, b.name, p.username as createdby, b.created_at from bloodgroup b 
join users p on p.userid = b.createdby
order by 1 asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllContractors` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllContractors`()
BEGIN
SELECT 
    c.id,
    c.name,
    c.ntnnumber,
    c.contactname,
    c.contactnumber,
    c.contactdesignation,
    c.contactdepartment,
    c.address,
    c.initials,
    GROUP_CONCAT(cl.name SEPARATOR ', ') AS clientnames,
    GROUP_CONCAT(cl.id SEPARATOR ', ') AS clientids
FROM 
    contractor c
JOIN 
    client_contractor cc ON cc.contractor_id = c.id
JOIN 
    client cl ON cl.id = cc.client_id
GROUP BY 
    c.id, 
    c.name,
    c.ntnnumber,
    c.contactname,
    c.contactnumber,
    c.contactdesignation,
    c.contactdepartment,
    c.address,
    c.initials;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllDrivers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllDrivers`()
BEGIN
SELECT d.id
	,d.name
	,d.dob
    ,TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age
	,d.nic
    ,d.nicexpiry
	,d.licensenumber
	,d.licensetypeid
	,d.licenseexpiry
	,d.designation
	,d.department
	,d.permitnumber
	,d.permitissue
	,d.permitexpiry
	,d.bloodgroupid
	,d.contractorid
    ,d.visualid
    ,d.ddccount
    ,d.experience
    ,d.comment
FROM driver d
WHERE active = 1
ORDER BY d.created_at desc limit 100;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDriverByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDriverByID`(idDriver int)
BEGIN
SELECT d.id
	,d.name
	,d.dob
    ,TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age
	,d.nic
    ,d.nicexpiry
	,d.licensenumber
	,d.licensetypeid
	,d.licenseexpiry
	,d.designation
	,d.department
	,d.permitnumber
	,d.permitissue
	,d.permitexpiry
	,d.bloodgroupid
	,d.contractorid
    ,d.visualid
    ,d.ddccount
    ,d.experience
    ,d.comment
	,p.username AS createdby
FROM driver d
JOIN users p ON p.userid = d.createdby
WHERE active = 1 and d.id = idDriver;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDriverByNIC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDriverByNIC`(
nicDriver VARCHAR(255))
BEGIN
SELECT d.id
	,d.name
	,d.dob
    ,TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age
	,d.nic
    ,d.nicexpiry
	,d.licensenumber
	,d.licensetypeid
	,d.licenseexpiry
	,d.designation
	,d.department
	,d.permitnumber
	,d.permitissue
	,d.permitexpiry
	,d.bloodgroupid
	,d.contractorid
    ,d.visualid
    ,d.ddccount
    ,d.experience
    ,d.comment
	,u.username AS createdby
FROM driver d
JOIN users u ON u.userid = d.createdby
WHERE active = 1 and d.nic = nicDriver;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_session_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_session_data`(
	IN p_driver_nic VARCHAR(255),
    IN p_driver_permit VARCHAR(255),
    IN p_session_name VARCHAR(255),
    IN p_assessment_type ENUM('Initial', 'Middle', 'Final')
    )
BEGIN
-- Select statement with joins
    SELECT 
        s.id,
        s.name,
        s.sessiondate,
        s.locationid,
        s.resultid,
        s.stageid,
        s.titleid,
        s.vehicleid,
        s.totalscore,
        d.id,
        d.name as drivername,
        d.nic,
        d.permitnumber,
        d.permitissue,
        d.permitexpiry,
        d.bloodgroupid,
        d.contractorid,
        t.id,
        t.name as trainername,
        t.initials,
        a.id,
        a.slavecategoryid,
        a.activityid,
        a.assessment_type,
        a.score,
        a.assessmentdate
    FROM session s
    
    -- Join with session_driver to get driver details
    LEFT JOIN session_driver sd ON s.id = sd.session_id
    LEFT JOIN driver d ON sd.driver_id = d.id
    
    -- Join with session_trainer to get trainer details
    LEFT JOIN session_trainer st ON s.id = st.session_id
    LEFT JOIN trainer t ON st.trainer_id = t.id
    
    -- Join with assessment to get assessment details
    LEFT JOIN assessment a ON s.id = a.sessionid
    
    -- Apply filters if parameters are passed
    WHERE (p_driver_nic IS NULL OR d.nic = p_driver_nic)
      AND (p_driver_permit IS NULL OR d.permitnumber = p_driver_permit)
      AND (p_session_name IS NULL OR s.name = p_session_name)
      AND (p_assessment_type IS NULL OR a.assessment_type = p_assessment_type)
    ORDER BY s.sessiondate DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_session_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_session_data`(
	IN p_sessionname VARCHAR(255),
    IN p_sessiondate DATE,
    IN p_locationid INT,
	IN p_resultid INT,
	IN p_stageid INT,
	IN p_titleid INT,
	IN p_vehicleid INT,
    IN p_classdate DATE,
    IN p_yarddate DATE,
    IN p_weather VARCHAR(100),
    IN p_traffic VARCHAR(255),
    IN p_route VARCHAR(100),
    IN p_totalscore INT,
    IN p_userid INT,
    IN p_driver_id INT, 
    IN p_trainer_ids VARCHAR(255),  -- Comma-separated trainer IDs
    IN p_assessment_data JSON       -- JSON array of assessment data
    )
BEGIN

DECLARE last_session_id INT;
    DECLARE trainer_id INT;
	DECLARE ddccount INT;
    DECLARE assessment_id INT;
    DECLARE assessment_json JSON;
    DECLARE i INT DEFAULT 0;
    DECLARE json_length INT;
    
-- Error handling: check if required parameters are NULL
    IF p_sessionname IS NULL OR p_sessionname = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: session name is required.';
    END IF;

    IF p_sessiondate IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: session date is required.';
    END IF;

    IF p_locationid IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: location ID is required.';
    END IF;
    
    IF p_resultid IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: result ID is required.';
    END IF;
    
    IF p_titleid IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: title ID is required.';
    END IF;
    
    IF p_vehicleid IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: vehicle ID is required.';
    END IF;
    
    IF p_totalscore IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: total score is required.';
    END IF;

    IF p_driver_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: driver ID is required.';
    END IF;

    IF p_trainer_ids IS NULL OR p_trainer_ids = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: at least one trainer ID is required.';
    END IF;

    IF p_assessment_data IS NULL OR JSON_LENGTH(p_assessment_data) = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: assessment data is required.';
    END IF;
    
    IF p_userid IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: user ID is required.';
    END IF;
    
    -- Step 1: Insert into the session table
    INSERT INTO session (name, sessiondate, locationid,resultid,stageid,titleid,vehicleid,totalscore,classdate,yarddate,weather,traffic,route,createdby,modifiedby)
    VALUES (p_sessionname, p_sessiondate, p_locationid,p_resultid,p_stageid,p_titleid,p_vehicleid,p_totalscore,p_classdate,p_yarddate,p_weather,p_traffic,p_route,p_userid,p_userid);
    
    -- Retrieve the last inserted session ID
    SET last_session_id = LAST_INSERT_ID();

    -- Step 2: Insert into session_driver and handle ddccount update

    -- Fetch the current ddccount value for the last driver
    SELECT ddccount INTO ddccount
    FROM driver
    WHERE id = p_driver_id;

    -- If ddccount is NULL or 0, set it to 1
    IF ddccount IS NULL OR ddccount = 0 THEN
        SET ddccount = 1;
    -- Otherwise, increment ddccount by 1
    ELSE
        SET ddccount = ddccount + 1;
    END IF;

    -- Update the driver table with the new ddccount value
    UPDATE driver
    SET ddccount = ddccount
    WHERE id = p_driver_id;

    -- Insert into session_driver table
    INSERT INTO session_driver (session_id, driver_id)
    VALUES (last_session_id, p_driver_id);

    -- Step 3: Insert into session_trainer (handle comma-separated trainer IDs)
    WHILE LOCATE(',', p_trainer_ids) > 0 DO
        SET trainer_id = SUBSTRING_INDEX(p_trainer_ids, ',', 1);
        INSERT INTO session_trainer (session_id, trainer_id)
        VALUES (last_session_id, trainer_id);
        SET p_trainer_ids = SUBSTRING(p_trainer_ids, LOCATE(',', p_trainer_ids) + 1);
    END WHILE;
    -- Insert the last trainer (after the last comma)
    INSERT INTO session_trainer (session_id, trainer_id)
    VALUES (last_session_id, p_trainer_ids);

    -- Step 4: Insert into assessment (from JSON data)
    SET json_length = JSON_LENGTH(p_assessment_data);

    -- Iterate through each assessment in the JSON array
    WHILE i < json_length DO
        SET assessment_json = JSON_EXTRACT(p_assessment_data, CONCAT('$[', i, ']'));
        
        INSERT INTO assessment (sessionid, slavecategoryid,activityid, assessment_type, score, assessmentdate)
        VALUES (
            last_session_id,
            JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.slavecategoryid')),
			JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.activityid')),
            JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.assessmenttype')),
            JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.score')),
            JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.assessmentdate'))
        );
        
        SET i = i + 1;
    END WHILE;
    
END ;;
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

-- Dump completed on 2024-10-10 19:20:59
