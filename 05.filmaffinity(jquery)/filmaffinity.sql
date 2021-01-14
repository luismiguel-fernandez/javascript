-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2019 a las 09:43:32
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `filmaffinity`
--
CREATE DATABASE IF NOT EXISTS `filmaffinity` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `filmaffinity`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actores`
--

DROP TABLE IF EXISTS `actores`;
CREATE TABLE `actores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actores`
--

INSERT INTO `actores` (`id`, `nombre`) VALUES
(1, 'Jeremy Theobald'),
(2, 'Guy Pearce'),
(3, 'Carrie-Anne Moss'),
(4, 'Joe Pantoliano'),
(5, 'Hugh Jackman'),
(6, 'Christian Bale'),
(7, 'Michael Caine'),
(8, 'Scarlett Johansson'),
(9, 'David Bowie'),
(10, 'Heath Ledger'),
(11, 'Aaron Eckhart'),
(12, 'Gary Oldman'),
(13, 'Morgan Freeman'),
(14, 'Leonardo DiCaprio'),
(15, 'Marion Cotillard'),
(16, 'Tom Hardy'),
(17, 'Cillian Murphy'),
(18, 'Joseph Gordon-Levitt'),
(19, 'Ellen Page'),
(20, 'Sigourney Weaver'),
(21, 'John Hurt'),
(22, 'Harrison Ford'),
(23, 'Rutger Hauer'),
(24, 'Sean Young'),
(25, 'Daryl Hannah'),
(26, 'Susan Sarandon'),
(27, 'Geena Davis'),
(28, 'Harvey Keitel'),
(29, 'Brad Pitt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directores`
--

DROP TABLE IF EXISTS `directores`;
CREATE TABLE `directores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `directores`
--

INSERT INTO `directores` (`id`, `nombre`) VALUES
(1, 'Alejandro Amenabar'),
(2, 'Christopher Nolan'),
(3, 'Ridley Scott'),
(4, 'Stanley Kubrick'),
(5, 'James Cameron');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `anyo` year(4) NOT NULL,
  `director` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`, `anyo`, `director`) VALUES
(1, 'Alien, el octavo pasajero', 1979, 3),
(2, 'Aliens: El regreso', 1986, 5),
(3, 'Following', 1998, 2),
(4, 'Memento', 2000, 2),
(5, 'El truco final', 2006, 2),
(6, 'El caballero oscuro', 2008, 2),
(7, 'Origen', 2010, 2),
(8, 'Blade Runner', 1982, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparto`
--

DROP TABLE IF EXISTS `reparto`;
CREATE TABLE `reparto` (
  `idPelicula` int(11) NOT NULL,
  `idActor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reparto`
--

INSERT INTO `reparto` (`idPelicula`, `idActor`) VALUES
(1, 20),
(2, 20),
(4, 2),
(4, 3),
(5, 5),
(6, 6),
(6, 10),
(6, 11),
(6, 11),
(6, 17),
(7, 14),
(8, 22),
(8, 23),
(8, 24),
(8, 25);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actores`
--
ALTER TABLE `actores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `directores`
--
ALTER TABLE `directores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `director` (`director`);

--
-- Indices de la tabla `reparto`
--
ALTER TABLE `reparto`
  ADD KEY `idPelicula` (`idPelicula`,`idActor`),
  ADD KEY `idActor` (`idActor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actores`
--
ALTER TABLE `actores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `directores`
--
ALTER TABLE `directores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD CONSTRAINT `peliculas_ibfk_1` FOREIGN KEY (`director`) REFERENCES `directores` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `reparto`
--
ALTER TABLE `reparto`
  ADD CONSTRAINT `reparto_ibfk_1` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reparto_ibfk_2` FOREIGN KEY (`idActor`) REFERENCES `actores` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
