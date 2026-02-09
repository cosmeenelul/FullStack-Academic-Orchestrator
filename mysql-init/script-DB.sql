CREATE DATABASE  IF NOT EXISTS `profesoriDepartamenteDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `profesoriDepartamenteDB`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: profesoriDepartamenteDB
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `tblDepartamente`
--

DROP TABLE IF EXISTS `tblDepartamente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblDepartamente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(100) NOT NULL,
  `telefon` varchar(10) NOT NULL,
  `linkWeb` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblDepartamente`
--

LOCK TABLES `tblDepartamente` WRITE;
/*!40000 ALTER TABLE `tblDepartamente` DISABLE KEYS */;
INSERT INTO `tblDepartamente` VALUES (4,'Telecomunicații','0214024769','http://telecom.pub.ro'),(7,'Dispozitive, circuite și arhitecturi electronice','0214024112','https://www.dcae.pub.ro'),(8,'Electronică aplicată și ingineria informației','0214024838','http://www.eaii.pub.ro/'),(9,'Tehnologie Electronică şi Fiabilitate','0214024769','https://www.tehfi.pub.ro/'),(17,'automatica','021456897','www.automatica.ro');
/*!40000 ALTER TABLE `tblDepartamente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProfesori`
--

DROP TABLE IF EXISTS `tblProfesori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProfesori` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(100) NOT NULL,
  `prenume` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefon` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProfesori`
--

LOCK TABLES `tblProfesori` WRITE;
/*!40000 ALTER TABLE `tblProfesori` DISABLE KEYS */;
INSERT INTO `tblProfesori` VALUES (4,'OBREJA','Șerban-Georgică','serban.obreja@upb.ro','0214024769'),(27,'DAN','Claudius','claudius.dan@upb.ro','0214024824'),(29,'VLĂDESCU','Marian','marian.vladescu@upb.ro','0214024671'),(30,'Mladin','Andrei','cosmi.gabriel212004@gmail.com','0774402824');
/*!40000 ALTER TABLE `tblProfesori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProfesoriDepartamente`
--

DROP TABLE IF EXISTS `tblProfesoriDepartamente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProfesoriDepartamente` (
  `departament_id` int NOT NULL,
  `profesor_id` int NOT NULL,
  `rol_in_departament` enum('Membru','Director') DEFAULT NULL,
  PRIMARY KEY (`departament_id`,`profesor_id`),
  KEY `profesor_id` (`profesor_id`),
  CONSTRAINT `tblProfesoriDepartamente_ibfk_1` FOREIGN KEY (`departament_id`) REFERENCES `tblDepartamente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tblProfesoriDepartamente_ibfk_2` FOREIGN KEY (`profesor_id`) REFERENCES `tblProfesori` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProfesoriDepartamente`
--

LOCK TABLES `tblProfesoriDepartamente` WRITE;
/*!40000 ALTER TABLE `tblProfesoriDepartamente` DISABLE KEYS */;
INSERT INTO `tblProfesoriDepartamente` VALUES (4,4,'Director'),(7,27,'Director'),(8,30,'Director'),(9,4,'Membru'),(9,29,'Director');
/*!40000 ALTER TABLE `tblProfesoriDepartamente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-20 20:32:47
