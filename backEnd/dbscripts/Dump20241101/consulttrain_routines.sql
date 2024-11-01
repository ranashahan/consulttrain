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
-- Temporary view structure for view `vsession`
--

DROP TABLE IF EXISTS `vsession`;
/*!50001 DROP VIEW IF EXISTS `vsession`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vsession` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `sessiondate`,
 1 AS `locationid`,
 1 AS `resultid`,
 1 AS `stageid`,
 1 AS `titleid`,
 1 AS `vehicleid`,
 1 AS `totalscore`,
 1 AS `classdate`,
 1 AS `yarddate`,
 1 AS `weather`,
 1 AS `traffic`,
 1 AS `route`,
 1 AS `active`,
 1 AS `driverid`,
 1 AS `drivername`,
 1 AS `nic`,
 1 AS `permitnumber`,
 1 AS `trainers`,
 1 AS `assessments`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vsession`
--

/*!50001 DROP VIEW IF EXISTS `vsession`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vsession` AS select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`sessiondate` AS `sessiondate`,`s`.`locationid` AS `locationid`,`s`.`resultid` AS `resultid`,`s`.`stageid` AS `stageid`,`s`.`titleid` AS `titleid`,`s`.`vehicleid` AS `vehicleid`,`s`.`totalscore` AS `totalscore`,`s`.`classdate` AS `classdate`,`s`.`yarddate` AS `yarddate`,`s`.`weather` AS `weather`,`s`.`traffic` AS `traffic`,`s`.`route` AS `route`,`s`.`active` AS `active`,`d`.`id` AS `driverid`,`d`.`name` AS `drivername`,`d`.`nic` AS `nic`,`d`.`permitnumber` AS `permitnumber`,group_concat(distinct `st`.`trainer_id` separator ',') AS `trainers`,json_arrayagg(json_object('id',`a`.`id`,'slavecategoryid',`a`.`slavecategoryid`,'activityid',`a`.`activityid`,'assessment_type',`a`.`assessment_type`,'score',`a`.`score`,'assessmentdate',`a`.`assessmentdate`)) AS `assessments` from (((((`session` `s` left join `session_driver` `sd` on((`s`.`id` = `sd`.`session_id`))) left join `driver` `d` on((`sd`.`driver_id` = `d`.`id`))) left join `session_trainer` `st` on((`s`.`id` = `st`.`session_id`))) left join `trainer` `t` on((`st`.`trainer_id` = `t`.`id`))) left join `assessment` `a` on((`s`.`id` = `a`.`sessionid`))) group by `s`.`id`,`s`.`name`,`s`.`sessiondate`,`s`.`locationid`,`s`.`totalscore`,`d`.`id`,`d`.`name`,`d`.`nic`,`d`.`permitnumber` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'consulttrain'
--

--
-- Dumping routines for database 'consulttrain'
--
/*!50003 DROP PROCEDURE IF EXISTS `delete_session_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_session_data`(
IN p_session_id INT)
BEGIN
    -- Start transaction
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- If an error occurs, roll back the transaction
        ROLLBACK;
        -- Raise an error message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred during deletion';
    END;

    START TRANSACTION;

    -- Step 1: Set session as inactive
UPDATE session 
SET 
    active = 0
WHERE
    id = p_session_id;

 -- Step 2: Update ddccount for drivers involved in this session
UPDATE driver d
        JOIN
    session_driver sd ON d.id = sd.driver_id 
SET 
	d.ddccount = d.ddccount -1
WHERE
    sd.session_id = p_session_id;

    -- Step 3: Delete session_driver entries
DELETE FROM session_driver 
WHERE
    session_id = p_session_id;

    -- Step 4: Delete session_trainer entries
DELETE FROM session_trainer 
WHERE
    session_id = p_session_id;

   -- Step 5: disable savemode
	SET SQL_SAFE_UPDATES = 0;
    
    -- Step 6: Delete assessments related to this session
DELETE FROM assessment 
WHERE
    sessionid = p_session_id;
    
    -- Step 7: enable savemode
	SET SQL_SAFE_UPDATES = 1;
    
    -- Commit the transaction
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `getdashboard_counts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getdashboard_counts`()
BEGIN
 DECLARE last_year_start DATE;
  DECLARE current_month_start DATE;

  SET last_year_start = DATE_SUB(CURDATE(), INTERVAL 1 YEAR);
  SET current_month_start = DATE_FORMAT(CURDATE(), '%Y-%m-01');
  
  SELECT
    (SELECT COUNT(id) FROM driver WHERE active = 1 AND created_at BETWEEN last_year_start AND CURDATE()) AS total_drivers,
    (SELECT COUNT(id) FROM driver WHERE active = 1 AND created_at BETWEEN current_month_start AND CURDATE()) AS current_month_drivers,
    (SELECT COUNT(id) FROM session WHERE active = 1 AND created_at BETWEEN last_year_start AND CURDATE()) AS total_sessions,
    (SELECT COUNT(id) FROM session WHERE active = 1 AND created_at BETWEEN current_month_start AND CURDATE()) AS current_month_sessions;
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
WHERE d.active = 1 and d.id = idDriver;
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
        s.classdate,
        s.yarddate,
        s.weather,
        s.traffic,
        s.route,
        d.id as driverid,
        d.name as drivername,
        d.nic,
        d.permitnumber,
        d.permitissue,
        d.permitexpiry,
        d.bloodgroupid,
        d.contractorid,
        t.id as trainerid,
        t.name as trainername,
        t.initials,
        a.id as assessmentid,
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
    IN p_totalscore INT,
    IN p_classdate DATE,
    IN p_yarddate DATE,
    IN p_weather VARCHAR(100),
    IN p_traffic VARCHAR(255),
    IN p_route VARCHAR(100),
    IN p_userid INT,
    IN p_driver_id INT, 
    IN p_trainer_ids VARCHAR(255),  -- Comma-separated trainer IDs
    IN p_assessment_data JSON       -- JSON array of assessment data
    )
BEGIN

DECLARE last_session_id INT;
    DECLARE trainer_id INT;
	DECLARE ddc INT;
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
     SET ddc = (SELECT ddccount FROM driver d WHERE d.id = p_driver_id);

    -- If ddccount is NULL or 0, set it to 1
    IF ddc IS NULL OR ddc = 0 THEN
        SET ddc = 1;
    -- Otherwise, increment ddccount by 1
    ELSE
        SET ddc = ddc + 1;
    END IF;

    -- Update the driver table with the new ddccount value
    UPDATE driver SET ddccount = ddc WHERE id = p_driver_id;

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
/*!50003 DROP PROCEDURE IF EXISTS `update_session_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_session_data`(
	IN p_session_id INT,
    IN p_session_date DATE,
    IN p_locationid INT,
	IN p_resultid INT,
	IN p_stageid INT,
	IN p_titleid INT,
	IN p_vehicleid INT,
    IN p_totalscore INT,
    IN p_classdate DATE,
    IN p_yarddate DATE,
    IN p_weather VARCHAR(100),
    IN p_traffic VARCHAR(255),
    IN p_route VARCHAR(100),
    IN p_userid INT,
    IN p_assessment_data JSON)
BEGIN
DECLARE i INT DEFAULT 0;
    DECLARE json_length INT;
    DECLARE assessment_json JSON;
    DECLARE existing_assessment_id INT;
    
    -- Step 1: Update the session
    UPDATE session
    SET sessiondate = p_session_date,
        locationid = p_locationid,
        resultid = p_resultid,
        stageid = p_stageid,
        titleid = p_titleid,
        vehicleid = p_vehicleid,
        totalscore = p_totalscore,
        classdate = p_classdate,
        yarddate = p_yarddate,
        weather = p_weather,
        traffic = p_traffic,
        route = p_route,
        modifiedby = p_userid
    WHERE id = p_session_id;
SET SQL_SAFE_UPDATES = 0;
    -- Step 2: Update or insert into assessments
    SET json_length = JSON_LENGTH(p_assessment_data);

    -- Iterate through each assessment in the JSON array
    WHILE i < json_length DO
        SET assessment_json = JSON_EXTRACT(p_assessment_data, CONCAT('$[', i, ']'));

        -- Try to update the existing assessment based on sessionid, slavecategoryid, and activityid
        UPDATE assessment
        SET
            score = JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.score')),
            assessmentdate = JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.assessmentdate'))
        WHERE
            sessionid = p_session_id
            AND slavecategoryid = JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.slavecategoryid'))
            AND activityid = JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.activityid'))
            AND assessment_type = JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.assessmenttype'));

        -- Check if any row was affected by the update
        IF ROW_COUNT() = 0 THEN
            -- If no rows were updated, insert a new record
            INSERT INTO assessment (sessionid, slavecategoryid, activityid, assessment_type, score, assessmentdate)
            VALUES (
                p_session_id,
                JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.slavecategoryid')),
                JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.activityid')),
                JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.assessmenttype')),
                JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.score')),
                JSON_UNQUOTE(JSON_EXTRACT(assessment_json, '$.assessmentdate'))
            );
        END IF;

        -- Move to the next item in the JSON array
        SET i = i + 1;
    END WHILE;
    SET SQL_SAFE_UPDATES = 1;
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

-- Dump completed on 2024-11-01 19:57:26
