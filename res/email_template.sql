-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 08, 2021 at 04:45 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `email_template`
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
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `sibling` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sibling`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nodejs_story`
--

INSERT INTO `nodejs_story` (`id`, `title`, `make_id`, `created_at`, `updated_at`, `created_by`, `updated_by`, `active_date`, `publish_date`, `embargo_date`, `status`, `bg_img`, `bg_color`, `link_color`, `layout`, `content`, `sibling`) VALUES
(10, 'Example 4', NULL, '2021-07-31 05:05:49', '2021-07-31 05:05:49', NULL, NULL, '2021-07-31 05:05:49', '2021-07-31 05:05:49', '2021-07-31 05:05:49', NULL, 'default-header.jpg', '#e6f2ff', '#000066', '[{\"rowID\":2,\"rowWithColumn\":1},{\"rowID\":1,\"rowWithColumn\":2},{\"rowID\":3,\"rowWithColumn\":3},{\"afterRow\":2,\"spaceRow\":12},{\"rowID\":4,\"rowWithColumn\":1}]', '[{\"rowNumber\":1,\"columnNumber\":2,\"blockElement\":{\"name\":\"imgBlockContent\",\"blockHtml\":\"<a><img /></a>\",\"imgHyperlink\":\"http://localhost:4000\",\"imgNewTab\":false,\"imgUrl\":\"/img/empty-image.png\"}},{\"rowNumber\":1,\"columnNumber\":1,\"blockElement\":{\"name\":\"txtBlockContent\",\"blockHtml\":\"<div id=~_txt-1-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>\"}},{\"rowNumber\":2,\"columnNumber\":1,\"blockElement\":{\"name\":\"txtBlockContent\",\"blockHtml\":\"<div id=~_txt-2-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>\"}},{\"rowNumber\":3,\"columnNumber\":3,\"blockElement\":{\"name\":\"imgBlockContent\",\"blockHtml\":\"<a><img /></a>\",\"imgHyperlink\":\"http://localhost:4000\",\"imgNewTab\":false,\"imgUrl\":\"img-3-3-159867093-38-o.jpg\"}},{\"rowNumber\":3,\"columnNumber\":1,\"blockElement\":{\"name\":\"txtBlockContent\",\"blockHtml\":\"<div id=~_txt-3-1~_ contenteditable=~_true~_ class=~_content txt-content-block~_>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!</div>\"}},{\"rowNumber\":4,\"columnNumber\":1,\"blockElement\":{\"name\":\"socialBlockContent\",\"blockHtml\":\"<div>social</div>\",\"socialFbHyperlink\":\"fb.com/md.shayon.148\",\"socialTwitterHyperlink\":\"twitter.com/shayon_md\",\"socialInstagramHyperlink\":\"https://www.instagram.com/md_shayon/\"}}]', '[{\"rowNum\":1,\"colNum\":2,\"btnBgColor\":\"rgb(70, 133, 192)\",\"btnTextColor\":\"rgb(15, 48, 80)\",\"btnHyperlink\":\"http://localhost:4000\",\"btnOpenNewTab\":false,\"btnRound\":false,\"btnAlign\":\"inherit\",\"btnContent\":\"Preview\",\"btnFontFamily\":\"Helvetica\",\"btnFontSize\":12},{\"rowNum\":3,\"colNum\":1,\"btnBgColor\":\"rgb(70, 133, 192)\",\"btnTextColor\":\"rgb(15, 48, 80)\",\"btnHyperlink\":\"http://localhost:4000\",\"btnOpenNewTab\":false,\"btnRound\":false,\"btnAlign\":\"inherit\",\"btnContent\":\"Preview\",\"btnFontFamily\":\"Helvetica\",\"btnFontSize\":12}]');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
