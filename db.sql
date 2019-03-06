-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: login_reg_app_db
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `contacts` (
  `contactId` int(11) NOT NULL AUTO_INCREMENT,
  `contactNumber` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `extension` varchar(45) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `countryCode` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`contactId`),
  KEY `contact_user_idx` (`userId`),
  CONSTRAINT `contact_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'8766978804','home',NULL,10,'091','2019-03-05 16:15:18',0),(2,'9860157360','home',NULL,10,'091','2019-03-05 16:20:15',0),(3,'8766978804','home',NULL,13,'091','2019-03-05 17:01:42',0),(6,'8983175362','home',NULL,13,'091','2019-03-05 17:56:16',0),(7,'9860157360','home',NULL,13,'091','2019-03-05 17:56:31',1),(8,'9860157360','home',NULL,13,'091','2019-03-06 11:27:26',1);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(60) DEFAULT NULL,
  `emailId` varchar(60) DEFAULT NULL,
  `passwordHash` varchar(500) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT '0',
  `secretKey` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'RP','rkp1@gmail.com','66d6685046ff8ac1d29665436edcf2b3c82fe66898a76479db78721e7744f4bb','2019-02-26 18:18:27',0,'mtx5m407p3oa4ststq89'),(10,'Pavan Maind','pavanm@winjit.com','8526b10cf9eebd4700fe1e4afddb946ac0d378456a08a2228cba118798037166','2019-02-26 18:24:31',0,'yn09whbcasca04a4boww'),(13,'Pavan Maind','akshayj@winjit.com','4c55c3f02236a77ec18baab6efdbed38e183ad068bd63da4ddbb6cd718692537','2019-03-01 19:58:21',0,'xiv0q4tk12ld70t7hwpk'),(14,'Pavan Maind','kirti@winjit.com','cb9eb40df42f5fb3c9c6ab01b19e587affde1192eded2bd398176fe2081af8ca','2019-03-01 20:29:53',0,'l4lfirwa1iw42bmlcgs5'),(15,'Pavan Maind','himanshup@winjit.com','5efe0982c6cd3a9b31837de264da3e8e09db0b445057da5dd234f2de883d850b','2019-03-06 11:46:57',0,'bzv01j49ieernu7b4d8h');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'login_reg_app_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `AddUpdateContact` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddUpdateContact`( p_contactNumber varchar(45), p_type varchar(45), p_extension varchar(45), p_userId int(11), p_countryCode varchar(45), p_isUpdate boolean, p_contactId int(11))
BEGIN
  DECLARE ip_NewContactID INT ;
  DECLARE ip_IsExists Boolean ;
  
	IF ( SELECT EXISTS (SELECT 1 FROM contacts WHERE contactNumber = p_contactNumber and isDeleted = 0 and userId = p_userId) )
		  THEN
          set ip_IsExists = true;
	else
			set ip_IsExists = false;
	end if;
          
  
  IF (p_isUpdate)
	THEN
		IF (ip_IsExists)
		  THEN
			SELECT 1 as IsOldRecord;
		else
        
			IF(SELECT EXISTS (SELECT 1 FROM contacts WHERE contactId = p_contactId) )
				THEN
					update contacts set contactNumber = p_contactNumber, type = p_type, extension = p_extension, 
					countryCode = p_countryCode where contactId = p_contactId;
                    
                    SELECT 
					contactId,
					contactNumber,
					type,
                    extension,
                    countryCode
					FROM
						contacts
					WHERE
						contactId = p_contactId;
			else
				SELECT 1 as NoRecordExists;
            end if;
                
        end if;

	ELSE
		
		IF (ip_IsExists)
		  THEN
			SELECT 1 as IsOldRecord;

		ELSE
			  
				-- INSERT NEW CONTACT
				 INSERT INTO contacts
					   (contactNumber, type, extension, userId, countryCode)
				 VALUES
				  (p_contactNumber, p_type, p_extension, p_userId, p_countryCode);
				-- GET PRIMARY KEY OF NEW ADDED RECORD
				 SET ip_NewContactID = LAST_INSERT_ID();


				-- RETURN RECORD
				SELECT 
					contactId,
					contactNumber,
					type,
                    extension,
                    countryCode
				FROM
					contacts
				WHERE
					contactId = ip_NewContactID;

		END IF;
        
        
	END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SignupUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SignupUser`( p_fullName varchar(500), p_email_id varchar(500), p_password_hash varchar(500), p_secret_key varchar(500))
BEGIN
  DECLARE ip_NewUserID INT ;

IF ( SELECT EXISTS (SELECT 1 FROM users WHERE emailId = p_email_id and isDeleted = 0) )
  THEN
  SELECT 1 as IsOldRecord;

ELSE
      
		-- INSERT NEW USER
		 INSERT INTO users
			   (fullName, emailId, passwordHash, secretKey, createdDate)
		 VALUES
		  (p_fullName, p_email_id, p_password_hash, p_secret_key, NOW());
		-- GET PRIMARY KEY OF NEW ADDED RECORD
		 SET ip_NewUserID = LAST_INSERT_ID();


		-- RETURN RECORD
		SELECT 
			userId,
            fullName,
			emailId
		FROM
			users
		WHERE
			userId = ip_NewUserID;

END IF;
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

-- Dump completed on 2019-03-06 18:45:22
