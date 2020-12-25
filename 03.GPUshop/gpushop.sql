-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-12-2020 a las 20:18:35
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gpushop`
--
CREATE DATABASE IF NOT EXISTS `gpushop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gpushop`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `titProducto` varchar(128) NOT NULL,
  `descProducto` varchar(1024) NOT NULL,
  `precioProducto` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `titProducto`, `descProducto`, `precioProducto`) VALUES
(1, 'MSI GeForce RTX 3070 SUPRIM X 8GB GDDR6', '', '615'),
(2, 'Asus ROG Strix GeForce RTX 3070 GAMING 8GB GDDR6', '', '750'),
(3, 'Zotac GAMING GeForce® RTX 3070 Twin Edge 8GB GDDR6', '', '520'),
(4, 'Asus TUF Radeon RX 6800 OC GAMING 16GB GDDR6', '', '746'),
(5, 'Powercolor Radeon RX 6800 Red Dragon 16GB GDDR6', '', '750'),
(6, 'Sapphire Nitro+ Radeon RX 6800 16GB GDDR6', '', '800'),
(7, 'Zotac GAMING GeForce® RTX 3080 Trinity 10GB GDDR6X', '', '720'),
(8, 'MSI GeForce® RTX 3080 VENTUS 3X OC 10GB GDDR6X', '', '735');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
