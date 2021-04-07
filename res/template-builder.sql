-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 07, 2021 at 06:29 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `template-builder`
--

-- --------------------------------------------------------

--
-- Table structure for table `nodejs_story`
--

CREATE TABLE `nodejs_story` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `make_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `active_date` datetime NOT NULL DEFAULT current_timestamp(),
  `publish_date` datetime NOT NULL DEFAULT current_timestamp(),
  `embargo_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT NULL,
  `bg_img` varchar(255) DEFAULT NULL,
  `bg_color` varchar(255) NOT NULL,
  `link_color` varchar(255) NOT NULL,
  `layout` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nodejs_story`
--

INSERT INTO `nodejs_story` (`id`, `title`, `make_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `active_date`, `publish_date`, `embargo_date`, `status`, `bg_img`, `bg_color`, `link_color`, `layout`, `content`) VALUES
(2, 'hello world', NULL, '2021-04-07 09:42:53', '2021-04-07 09:42:53', NULL, NULL, '2021-04-07 09:42:53', '2021-04-07 09:42:53', '2021-04-07 09:42:53', NULL, 'this is name', '#711313', '#bf1212', '[object Object],[object Object],[object Object]', '[object Object],[object Object],[object Object],[object Object]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nodejs_story`
--
ALTER TABLE `nodejs_story`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nodejs_story`
--
ALTER TABLE `nodejs_story`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
