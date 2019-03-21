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
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`contactId`),
  KEY `contact_user_idx` (`userId`),
  CONSTRAINT `contact_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (3,'8766978804','home',NULL,13,'091','2019-03-05 17:01:42',0,NULL,'2019-03-21 10:59:59',NULL),(6,'8983175362','home',NULL,13,'091','2019-03-05 17:56:16',0,NULL,'2019-03-21 10:59:59',NULL),(7,'9860157360','home',NULL,13,'091','2019-03-05 17:56:31',1,NULL,'2019-03-21 10:59:59',NULL),(8,'9860157360','home',NULL,13,'091','2019-03-06 11:27:26',1,NULL,'2019-03-21 10:59:59',NULL),(9,'8983175362','home',NULL,49,'091','2019-03-21 12:00:06',0,49,'2019-03-21 12:00:06',NULL),(10,'8745741245','home',NULL,49,'091','2019-03-21 12:01:52',0,49,NULL,NULL);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_pic_metadata`
--

DROP TABLE IF EXISTS `profile_pic_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profile_pic_metadata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imageName` varchar(100) DEFAULT NULL,
  `fileType` varchar(45) DEFAULT NULL,
  `imageNameOriginal` varchar(500) DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT '0',
  `createdDate` datetime DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_pic_metadata`
--

LOCK TABLES `profile_pic_metadata` WRITE;
/*!40000 ALTER TABLE `profile_pic_metadata` DISABLE KEYS */;
INSERT INTO `profile_pic_metadata` VALUES (1,'1553074873997_me.jpg','image/jpeg','me.jpg',1,'2019-03-20 15:11:33',NULL,13,NULL,13),(2,'1553074951479_me.jpg','image/jpeg','me.jpg',1,'2019-03-20 15:12:36',NULL,13,NULL,13),(3,'1553075047954_me.jpg','image/jpeg','me.jpg',1,'2019-03-20 15:14:11',NULL,13,NULL,13),(4,'1553075242423_me.jpg','image/jpeg','me.jpg',0,'2019-03-20 15:17:23',NULL,13,NULL,13),(5,'1553150041157_kS9Kf.png','image/png','kS9Kf.png',1,'2019-03-21 12:04:01',NULL,49,NULL,49),(6,'1553151075035_me.jpg','image/jpeg','me.jpg',0,'2019-03-21 12:21:15',NULL,49,NULL,49);
/*!40000 ALTER TABLE `profile_pic_metadata` ENABLE KEYS */;
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
  `updatedDate` datetime DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `emailId_UNIQUE` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'RP','rkp1@gmail.com','66d6685046ff8ac1d29665436edcf2b3c82fe66898a76479db78721e7744f4bb','2019-02-26 18:18:27',0,'mtx5m407p3oa4ststq89',NULL,NULL,NULL),(13,'Pavan Maind','akshayj@winjit.com','4c55c3f02236a77ec18baab6efdbed38e183ad068bd63da4ddbb6cd718692537','2019-03-01 19:58:21',0,'xiv0q4tk12ld70t7hwpk',NULL,NULL,NULL),(14,'Pavan Maind','kirti@winjit.com','cb9eb40df42f5fb3c9c6ab01b19e587affde1192eded2bd398176fe2081af8ca','2019-03-01 20:29:53',0,'l4lfirwa1iw42bmlcgs5',NULL,NULL,NULL),(23,'Danish Shaikh','amol@winjit.com','e6eb41304410f9c45e224bfe45f2511d83cdbd3421caf5894ca396ab91c463d0','2019-03-08 15:08:42',1,'z3ghi3cguhpz2t6hrxx2',NULL,NULL,NULL),(26,'Amol Avhad','ketan@winjit.com','25fd9a86c3ef236a0026feb3cfc4e91255e00325e526c6ae407511ff9f773518','2019-03-08 15:28:43',0,'wsfk81fckp1utrpjqtfr',NULL,NULL,NULL),(27,'Pavan Maind','deepakd@winjit.com','9de4d0e34e943613c843a1128b7a1c2d77fc44e25582c1b4710939c99882c61f','2019-03-08 15:38:17',1,'55vctiw3nv9q1qnqnjmf',NULL,NULL,NULL),(30,'Danish Shaikh','himanshup@winjit.com','23c520567f708b91117f8af46aa7b22c163753690a7146ff2235fa2317945a09','2019-03-08 16:09:19',1,'600xwissli10gg4x47ze',NULL,NULL,NULL),(39,'Pavan Maind','pavanm@winjit.com','63d62cd114104afd393b431a2996e212ab4554b6bf2b6b501b3e3993391d67ca','2019-03-08 16:56:43',0,'5hekbd4idmeskhx5gobx',NULL,NULL,NULL),(44,'Himanshu Patel','hp@winjit.com','5479a89dde293e29aea7dd02d1dc5b1c2b08805dcddbcac2c57b58575283b3cc','2019-03-13 14:46:35',0,'5l57fo3hdz8axn5j879a',NULL,NULL,NULL),(48,'Danish Shaikh','danishs@winjit.com','690dba5de7b6a9a31117aaed010f27065ced345da2dd4aa853a7a034fb9bd06c','2019-03-19 14:50:02',0,'uhc5xy9tkayteb4jc3uc',NULL,NULL,NULL),(49,'Danish S','danish@winjit.com','701d7b4fcafb16b2edee37add60cf8e9584695cb1a3d8062e6adb30d91103233','2019-03-21 11:58:07',0,'9fqfes0y9gnjba9chfsi',NULL,NULL,NULL),(50,'Danish Shaikh','d@winjit.com','98fd9f3eeb5aef15e9f05d0ecefb83cbc0c197288fc17adf758ac2b42dd6d774','2019-03-21 12:02:28',0,'qyl8kauaeyycwrfruuei','2019-03-21 12:03:08',49,49),(51,'Rahul Patil','h@winjit.com','b6fdd1133bfb8cd9c7c302b1c0069df38e08fcd1bcc210626b9e34ee31f7aede','2019-03-21 12:02:28',0,'djca4r725kf71tugt1l5','2019-03-21 12:03:08',49,49),(52,'Pavan Maind','pm@winjit.com','c99284f9e50f60d4eff455940c44ec7fd68bbee9d06e98eb3d78cdea100c642b','2019-03-21 12:02:28',0,'vc6ht34jokuty7adja77',NULL,49,NULL);
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
					countryCode = p_countryCode, updatedBy = p_userId, updatedAt = now() where contactId = p_contactId;
                    
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
					   (contactNumber, type, extension, userId, countryCode, createdBy)
				 VALUES
				  (p_contactNumber, p_type, p_extension, p_userId, p_countryCode, p_userId);
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `SignupUser`( p_fullName varchar(500), p_email_id varchar(500), p_password_hash varchar(500), p_secret_key varchar(500), p_request_by int(11))
BEGIN
  DECLARE ip_NewUserID INT ;

IF ( SELECT EXISTS (SELECT 1 FROM users WHERE emailId = p_email_id and isDeleted = 0) )
  THEN
  SELECT 1 as IsOldRecord;

ELSE
      
		-- INSERT NEW USER
		 INSERT INTO users
			   (fullName, emailId, passwordHash, secretKey, createdDate, createdBy)
		 VALUES
		  (p_fullName, p_email_id, p_password_hash, p_secret_key, NOW(), p_request_by);
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

-- Dump completed on 2019-03-21 12:52:34
