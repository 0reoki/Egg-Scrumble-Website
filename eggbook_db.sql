-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2020 at 08:10 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eggbook_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `book_table`
--

CREATE TABLE `book_table` (
  `BOOK_ID` int(15) NOT NULL,
  `BOOK_TITLE` varchar(50) DEFAULT NULL,
  `BOOK_AUTHOR` varchar(30) DEFAULT NULL,
  `BOOK_COPY` blob DEFAULT NULL,
  `BOOK_PRICE` float DEFAULT NULL,
  `BOOK_DESCRIPTION` text DEFAULT NULL,
  `BOOK_COVER` blob NOT NULL,
  `BOOK_RELEASEDATE` date NOT NULL,
  `BOOK_GENRE` varchar(1000) NOT NULL,
  `BOOK_LANGUAGE` varchar(20) NOT NULL,
  `CREATED BY` varchar(30) NOT NULL,
  `CREATED DATE` date NOT NULL,
  `MODIFIED BY` varchar(30) NOT NULL,
  `MODIFIED DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `USER_ID` int(15) NOT NULL,
  `USER_USERNAME` varchar(20) DEFAULT NULL,
  `USER_EMAIL` varchar(30) NOT NULL,
  `USER_PASSWORD` varchar(30) DEFAULT NULL,
  `USER_PHONE` varchar(20) NOT NULL,
  `USER_FIRSTNAME` varchar(30) NOT NULL,
  `USER_LASTNAME` varchar(30) NOT NULL,
  `USER_USERTYPE` varchar(20) NOT NULL,
  `USER_SEX` varchar(5) NOT NULL,
  `USER_BIRTHDATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book_table`
--
ALTER TABLE `book_table`
  ADD PRIMARY KEY (`BOOK_ID`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book_table`
--
ALTER TABLE `book_table`
  MODIFY `BOOK_ID` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `USER_ID` int(15) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
