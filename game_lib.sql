-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 29, 2026 at 11:06 AM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `game_lib`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `genre` varchar(100) NOT NULL,
  `platform` varchar(100) NOT NULL,
  `developer` varchar(100) NOT NULL,
  `publisher` varchar(100) NOT NULL,
  `release_date` date NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `cover_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `title`, `description`, `genre`, `platform`, `developer`, `publisher`, `release_date`, `rating`, `cover_image`) VALUES
(1, 'Minecraft', '', 'Sandbox', 'PC,PS5,XBOX', 'Mojang Studios', 'Xbox Game Studios', '2011-11-18', '9.0', 'minecraft.jpg'),
(2, 'Grand Theft Auto V', '', 'Action-Adventure, Open-World', 'PC,PS5,XBOX', 'Rockstar North', 'Rockstar Games', '2013-09-13', '8.5', 'gta5.jpg'),
(3, 'Assassin''s Creed ', '', 'Stealth, Action-Adventure', 'PC,PS5,XBOX', 'Ubisoft', 'Ubisoft', '2007-11-13', '8.0', 'AssassinsCreed.jpg'),
(4, 'The Witcher 3', 'An open world action RPG.', 'RPG', 'PC', 'CD Projekt Red', 'CD Projekt', '2015-05-19', '9.5', 'witcher3.jpg'),
(5, 'Hades', 'A fast-paced action roguelike where you battle your way out of the Underworld as Zagreus, son of Hades.', 'Action RPG', 'PC, Nintendo Switch, PlayStation', 'Supergiant Games', 'Supergiant Games', '2020-09-15', '9.0', 'hades.jpg'),
(7, 'Red Dead Redemption 2', '', 'Action-Adventure, Open-World', 'PC, PS4, Xbox One', 'Rockstar Games', 'Rockstar Games', '2018-10-26', '9.8', '1787999450227-red-dead-redemption-2-cover-art-1.jpg'),
(8, 'Cyberpunk 2077', '', 'RPG, Open-World', 'PC, PS4, PS5, Xbox One, Xbox Series X/S', 'CD Projekt Red', 'CD Projekt Red', '2020-12-10', '9.0', '1787999535169-Cyberpunk_2077_box_art.jpg'),
(9, 'Elden Ring', '', 'Action RPG', 'PC, PS4, PS5, Xbox One, Xbox Series X/S', 'FromSoftware', 'Bandai Namco Entertainment', '2022-02-25', '9.6', '1787999669509-61tttHU3WfL._AC_SL3840_.jpg'),
(10, 'Sekiro: Shadows Die Twice', '', 'Action RPG', 'PC, PS4, Xbox One', 'FromSoftware', 'Activision', '2019-03-22', '9.5', '1787999738822-Sekiro_art.jpg'),
(11, 'Dark Souls', '', 'Action RPG', 'PC, PS3, Xbox 360', 'FromSoftware', 'Bandai Namco Entertainment', '2019-09-22', '9.0', '1787999889768-dark.jpg'),
(12, 'Dark Souls III', '', 'Action RPG', 'PC, PS4, Xbox One', 'FromSoftware', 'Bandai Namco Entertainment', '2016-03-24', '9.5', '1787999960708-Dark_souls_3_cover_art.jpg'),
(13, 'Ghost of Tsushima', '', 'Action-Adventure, Open-World', 'PS4, PS5, PC', 'Sucker Punch Productions', 'Sony Interactive Entertainment', '2020-07-17', '9.5', '1788000028800-Ghost_of_Tsushima.jpg'),
(14, 'Dishonored', '', 'Action-Adventure, Stealth', 'PC, PS3, Xbox 360', 'Arkane Studios', 'Bethesda Softworks', '2012-10-09', '9.0', '1788000093589-dishonored.jpg'),
(15, 'Devil May Cry 3', '', 'Action, Hack-and-Slash', 'PS2, PC, Nintendo Switch', 'Capcom', 'Capcom', '2005-02-17', '9.0', '1788000464269-Devil_May_Cry_3_boxshot.jpg'),
(16, 'Little Nightmares II', '', 'Horror, Puzzle-Platformer', 'PC, PS4, PS5, Xbox One, Xbox Series X/S, Nintendo Switch', 'Tarsier Studios', 'Bandai Namco Entertainment', '2021-02-11', '8.5', '1788000518122-Little_Nightmares_II_cover.jpg'),
(17, 'Assassin''s Creed Unity', '', 'Action-Adventure, Stealth, Open-World', 'PC, PS4, Xbox One', 'Ubisoft Montreal', 'Ubisoft', '2014-11-11', '7.5', '1788000585164-unity.jpg'),
(18, 'Metal Gear Rising: Revengeance', '', 'Action, Hack-and-Slash', 'PC, PS3, Xbox 360', 'PlatinumGames', 'Konami', '2013-02-19', '8.5', '1788000643785-Metal_Gear_Rising_Revengeance_box_artwork.jpg'),
(19, 'Batman: Arkham Knight', '', 'Action-Adventure, Open-World', 'PC, PS4, Xbox One', 'Rocksteady Studios', 'Warner Bros. Interactive Entertainment', '2015-06-23', '9.0', '1788000713407-arkham.jpg'),
(20, 'Hotline Miami', '', 'Action, Top-Down Shooter', 'PC, PS4, PS Vita, PS3, Xbox One, Nintendo Switch', 'Dennaton Games', 'Devolver Digital', '2012-10-23', '8.5', '1788000770263-hotline.jpg'),
(21, 'Subnautica', '', 'Survival, Adventure', 'PC, PS4, PS5, Xbox One, Xbox Series X/S, Nintendo Switch', 'Unknown Worlds Entertainment', 'Unknown Worlds Entertainment', '2018-01-23', '9.0', '1788000823494-subnautica.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `review` text,
  `date_created` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`game_id`),
  KEY `game_id` (`game_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `game_id`, `rating`, `review`, `date_created`) VALUES
(1, 2, 1, '9.0', 'Amazing game! I really enjoyed it.', '2026-08-28'),
(2, 2, 2, '9.9', 'what a giid gamefasdfasdf', '2026-08-29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(2, 'admin', 'admin@gmail.com', '$2b$10$444sdX3CTkcOX9PbzIuJOeRmRAtjmHF/NQKn0H5cIRA8d.9ynZruS', 'admin'),
(3, 'test1', 'test1@gmail.com', '$2b$10$9A9JkqP28Th8qXKnb0oDCuBtsmKVpRuvdzddlZfYyYbbo2yEtafk6', 'user'),
(4, 'test2', 'test2@gmail.com', '$2b$10$vu7pTxApCzEvYqzz3aaUguncQM7AgjjO2SF3RHQKmP6wIsZ/C1z5m', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_lib`
--

CREATE TABLE IF NOT EXISTS `user_lib` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `date_added` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `user_lib`
--

INSERT INTO `user_lib` (`id`, `user_id`, `game_id`, `status`, `date_added`) VALUES
(1, 1, 1, 'Playing', '2026-08-27'),
(5, 2, 1, 'Completed', '2026-08-29'),
(6, 2, 2, 'Completed', '2026-08-29'),
(7, 2, 10, 'Completed', '2026-08-29'),
(8, 3, 21, 'Completed', '2026-08-29'),
(9, 3, 3, 'Wishlist', '2026-08-29'),
(10, 3, 4, 'Completed', '2026-08-29'),
(11, 4, 2, 'Playing', '2026-08-29'),
(12, 4, 3, 'Playing', '2026-08-29');
