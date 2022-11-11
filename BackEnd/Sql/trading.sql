-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 11, 2022 at 01:17 PM
-- Server version: 8.0.31-0ubuntu0.22.04.1
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trading`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_api`
--

CREATE TABLE `client_api` (
  `apiId` int NOT NULL,
  `userId` int NOT NULL,
  `clientApiId` varchar(75) NOT NULL,
  `apiKey` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apiSecret` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client_api`
--

INSERT INTO `client_api` (`apiId`, `userId`, `clientApiId`, `apiKey`, `apiSecret`, `password`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 16, 'adasdasdasd', 'asdsad', 'fghfghfghfghfgh', 'thkkcccna8nbpifoj1ohb6', '2022-11-10 12:33:04', '2022-11-11 07:09:21', 'inactive'),
(2, 16, '47239847234', 'fuiwefewufwiuf', 'iugwifhwiufh', '8b6mja7li4ajisiq8jcmro', '2022-11-11 06:22:49', '2022-11-11 06:50:21', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `email` varchar(75) NOT NULL,
  `password` varchar(75) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `dob` date NOT NULL,
  `panNumber` varchar(20) NOT NULL,
  `broker` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `brokerId` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userType` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive','suspended') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `firstName`, `lastName`, `phone`, `dob`, `panNumber`, `broker`, `brokerId`, `userType`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 'soumallyadey11@gmail.com', '$2b$12$AC3sRQoJbgajjz4MFuYN.utZ/96j7hepytrkNpkRVsZPJtfvY30JK', 'Soumallya', 'Dey', '9609542899', '1999-12-16', 'EKAPD8307K', 'sdvbidfbdfkfdv', 'dosfibhoibf', 'admin', '2022-11-08 11:01:04', '2022-11-08 11:01:04', 'active'),
(16, '1999soumallya@gmail.com', '$2b$12$xi27HIqQSNRTYrEOYdrASuu27ejBqDCJ1/hMbE0Zg85pDgV3AlAjG', 'Soumallya', 'Dey', '6294085545', '1999-12-16', 'EKAPD8307K', 'No Broker', 'No BrokerId', 'user', '2022-11-10 09:50:50', '2022-11-10 09:50:50', 'active'),
(17, 'admin@gmail.com', '$2b$12$0J5UV7zcKISwH03MCiAZlOgV4TaSyLMSxtTvirGN8IUPSIHq4J.pK', 'Admin', 'admin', '9609542899', '1999-12-16', 'EKAPD8307K', '', '', 'admin', '2022-11-11 07:46:59', '2022-11-11 07:46:59', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client_api`
--
ALTER TABLE `client_api`
  ADD PRIMARY KEY (`apiId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client_api`
--
ALTER TABLE `client_api`
  MODIFY `apiId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
