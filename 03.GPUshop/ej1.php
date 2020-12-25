<?php
class producto {
    var $titulo;
    var $precio;
}
function queryProducts($pattern,$conexion) {
    $consulta = "SELECT titProducto,precioProducto FROM productos WHERE titProducto LIKE '%".$pattern."%'";
    $sen = $conexion->prepare($consulta);
    $sen->execute();

    $result = array();
    while($row = $sen->fetch(PDO::FETCH_NAMED)){
        $producto = new producto();
        $producto->titulo = $row['titProducto'];
        $producto->precio = $row['precioProducto'];
        $result[] = $producto;
    }
    return $result;
}

$DEPURACION = false;
if ($DEPURACION) echo "<html><head></head><body>";
if(isset($_GET['pattern'])) {
	$server = "mysql:dbname=gpushop";
	$user = "root";
	$pass = "";
	$conexion = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
    echo json_encode( queryProducts($_GET['pattern'],$conexion) );
    //echo json_encode( queryProducts($_GET['pattern'],$conexion, JSON_UNESCAPED_UNICODE) );
}
else {
    echo "No has pasado el parámetro 'pattern'";
}
if ($DEPURACION) echo "</body></html>";
?>