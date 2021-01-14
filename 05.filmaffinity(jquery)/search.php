<?php

class sugerencia {
	var $id;
	var $texto;
	var $tipo;
}

function queryPattern($pattern, $connection) {
	$sugerencias = array();
	
	$sql = "SELECT * FROM peliculas WHERE titulo LIKE '%".$pattern."%'";
	$query = $connection->prepare($sql);
	$query->execute();
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$newSugerencia = new sugerencia();
		$newSugerencia->id = $row['id'];
		$newSugerencia->texto = $row['titulo'];
		$newSugerencia->tipo = 'tit';
		$sugerencias[] = $newSugerencia;
	}
	$sql = "SELECT * FROM actores WHERE nombre LIKE '%".$pattern."%'";
	$query = $connection->prepare($sql);
	$query->execute();
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$newSugerencia = new sugerencia();
		$newSugerencia->id = $row['id'];
		$newSugerencia->texto = $row['nombre'];
		$newSugerencia->tipo = 'act';
		$sugerencias[] = $newSugerencia;
	}
	$sql = "SELECT * FROM directores WHERE nombre LIKE '%".$pattern."%'";
	$query = $connection->prepare($sql);
	$query->execute();
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$newSugerencia = new sugerencia();
		$newSugerencia->id = $row['id'];
		$newSugerencia->texto = $row['nombre'];
		$newSugerencia->tipo = 'dir';
		$sugerencias[] = $newSugerencia;
	}
    return $sugerencias;
}

function xmlAddTit($xml, $root, $id, $connection) {
	$sql = "SELECT * FROM peliculas WHERE id='".$id."'";
	$query = $connection->prepare($sql);
	$query->execute();
	$flag = false;
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$flag = true;
		$node = $xml->createElement("resultado");
		$fila = $root->appendChild($node);
		$director = $row['director'];
		$node = $xml->createElement("tipo","0");
		$newnode = $fila->appendChild($node);
		foreach ($row as $columna => $valor) {
			$node = $xml->createElement($columna,$valor);
			$newnode = $fila->appendChild($node);
		}
	}
	if ($flag) {
		//añadir al XML el director de la pelicula
		$sql = "SELECT * FROM directores WHERE id='".$director."'";
		$query = $connection->prepare($sql);
		$query->execute();
		while ($row = $query->fetch(PDO::FETCH_NAMED)){
			$node = $xml->createElement("resultado");
			$fila = $root->appendChild($node);
			$node = $xml->createElement("tipo","1");
			$newnode = $fila->appendChild($node);
			foreach ($row as $columna => $valor) {
				$node = $xml->createElement($columna,$valor);
				$newnode = $fila->appendChild($node);
			}
		}
	}
	if ($flag) {
		//añadir al XML la lista de actores de este actor
		$sql = "SELECT a.id,a.nombre FROM reparto r,actores a WHERE idPelicula='".$id."' AND a.id=idActor";
		$query = $connection->prepare($sql);
		$query->execute();
		while ($row = $query->fetch(PDO::FETCH_NAMED)){
			$node = $xml->createElement("resultado");
			$fila = $root->appendChild($node);
			$node = $xml->createElement("tipo","2");
			$newnode = $fila->appendChild($node);
			foreach ($row as $columna => $valor) {
				$node = $xml->createElement($columna,$valor);
				$newnode = $fila->appendChild($node);
			}
		}
	}
	return $flag;
}
function xmlAddDir($xml, $root, $id, $connection) {
	$sql = "SELECT * FROM directores WHERE id='".$id."'";
	$query = $connection->prepare($sql);
	$query->execute();
	$flag = false;
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$flag = true;
		$node = $xml->createElement("resultado");
		$fila = $root->appendChild($node);
		$dirID = $row['id'];
		$node = $xml->createElement("tipo","1");
		$newnode = $fila->appendChild($node);
		foreach ($row as $columna => $valor) {
			$node = $xml->createElement($columna,$valor);
			$newnode = $fila->appendChild($node);
		}
	}
	if ($flag) {
		//añadir al XML la lista de peliculas de este director
		$sql = "SELECT id,titulo,anyo FROM peliculas WHERE director='".$dirID."'";
		$query = $connection->prepare($sql);
		$query->execute();
		while ($row = $query->fetch(PDO::FETCH_NAMED)){
			$node = $xml->createElement("resultado");
			$fila = $root->appendChild($node);
			$node = $xml->createElement("tipo","0");
			$newnode = $fila->appendChild($node);
			foreach ($row as $columna => $valor) {
				$node = $xml->createElement($columna,$valor);
				$newnode = $fila->appendChild($node);
			}
		}
	}
	return $flag;
}
function xmlAddAct($xml, $root, $id, $connection) {
	$sql = "SELECT * FROM actores WHERE id='".$id."'";
	$query = $connection->prepare($sql);
	$query->execute();
	$flag = false;
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$flag = true;
		$node = $xml->createElement("resultado");
		$fila = $root->appendChild($node);
		//$actID = $row['id'];
		$node = $xml->createElement("tipo","2");
		$newnode = $fila->appendChild($node);
		foreach ($row as $columna => $valor) {
			$node = $xml->createElement($columna,$valor);
			$newnode = $fila->appendChild($node);
		}
	}
	if ($flag) {
		//añadir al XML la lista de peliculas de este actor
		$sql = "SELECT id,titulo,anyo FROM peliculas p,reparto r WHERE idActor='".$id."' AND idPelicula=id";
		$query = $connection->prepare($sql);
		$query->execute();
		while ($row = $query->fetch(PDO::FETCH_NAMED)){
			$node = $xml->createElement("resultado");
			$fila = $root->appendChild($node);
			$node = $xml->createElement("tipo","0");
			$newnode = $fila->appendChild($node);
			foreach ($row as $columna => $valor) {
				$node = $xml->createElement($columna,$valor);
				$newnode = $fila->appendChild($node);
			}
		}
	}
	return $flag;
}
function xmlAddDirCarreer($xml, $root, $id, $connection) {
	return $flag;
}
function xmlAddActCarreer($xml, $root, $id, $connection) {
	$sql = "SELECT * FROM peliculas p,reparto r WHERE idActor='".$id."'";
	$query = $connection->prepare($sql);
	$query->execute();
	$flag = false;
	while ($row = $query->fetch(PDO::FETCH_NAMED)){
		$flag = true;
		$node = $xml->createElement("resultado");
		$fila = $root->appendChild($node);
		$node = $xml->createElement("tipo","tit");
		$newnode = $fila->appendChild($node);
		foreach ($row as $columna => $valor) {
			$node = $xml->createElement($columna,$valor);
			$newnode = $fila->appendChild($node);
		}
	}
	return $flag;
}

function queryID($id, $type, $connection) {
	$xml = new DOMDocument('1.0', 'UTF-8');
	$root = $xml->appendChild($xml->createElement("resultados"));
	$hayResultados = false;
	if ($type == "tit") {
		if (xmlAddTit($xml, $root, $id, $connection)) $hayResultados = true;
	} else if ($type == "dir") {
		if (xmlAddDir($xml, $root, $id, $connection)) $hayResultados = true;
	} else if ($type == "act") {
		if (xmlAddAct($xml, $root, $id, $connection)) $hayResultados = true;
	}
	
	if ($hayResultados) {
		header('Content-type: text/xml');
		return ($xml->saveXML());
	} else return "Sin resultados";
}

$server = "mysql:dbname=filmaffinity";
$user = 'root';
$pw = '';
$conexion = new PDO($server,$user,$pw,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
if(isset($_GET['p'])) {
	/* buscar cualquier coincidencia por patron */
    echo json_encode( queryPattern($_GET['p'],$conexion), JSON_UNESCAPED_UNICODE );
} else if(isset($_GET['id']) && isset($_GET['t'])) {
	/* buscar elementos asociados a la entidad "id" de tipo "t"  */
	echo utf8_encode( queryID($_GET['id'],$_GET['t'],$conexion ) );
} else {
    echo "No has pasado parámetros adecuados";
}
?>