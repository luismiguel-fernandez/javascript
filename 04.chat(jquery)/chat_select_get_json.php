<?php
if(isset($_GET['ultimo'])) {

    class cuaterna {
        var $ids;
        var $nicks;
        var $textos;
        var $fechas;
    }
    function queryIDs($pattern,$conexion) {
        $sentencia = "SELECT id_mensa FROM chat WHERE id_mensa > ".$_GET['ultimo'];
        $resultados = mysql_query($sentencia, $conexion) or die("Error en query: ".mysql_error());
        $salida = array();
        while ($fila = mysql_fetch_array($resultados)) {
           $salida[] = $fila['id_mensa'];
        }
        return $salida;
    }
    function queryNicks($pattern,$conexion) {
        $sentencia = "SELECT nick FROM chat WHERE id_mensa > ".$_GET['ultimo'];
        $resultados = mysql_query($sentencia, $conexion) or die("Error en query: ".mysql_error());
        $salida = array();
        while ($fila = mysql_fetch_array($resultados)) {
           $salida[] = utf8_encode($fila['nick']);
        }
        return $salida;
    }
    function queryTextos($pattern,$conexion) {
        $sentencia = "SELECT texto FROM chat WHERE id_mensa > ".$_GET['ultimo'];
        $resultados = mysql_query($sentencia, $conexion) or die("Error en query: ".mysql_error());
        $salida = array();
        while ($fila = mysql_fetch_array($resultados)) {
           $salida[] = $fila['texto'];
        }
        return $salida;
    }
    function queryFechas($pattern,$conexion) {
        $sentencia = "SELECT fechahora FROM chat WHERE id_mensa > ".$_GET['ultimo'];
        $resultados = mysql_query($sentencia, $conexion) or die("Error en query: ".mysql_error());
        $salida = array();
        while ($fila = mysql_fetch_array($resultados)) {
           $salida[] = $fila['fechahora'];
        }
        return $salida;
    }
    function queryAll($pattern,$conexion) {
        $cuaternaResult = new cuaterna();
        $cuaternaResult->ids = queryIDs($pattern,$conexion);
        $cuaternaResult->nicks = queryNicks($pattern,$conexion);
        $cuaternaResult->textos = queryTextos($pattern,$conexion);
        $cuaternaResult->fechas = queryFechas($pattern,$conexion);
        return $cuaternaResult;
    }

    $servidor = 'localhost';
	$bd = 'dwec';
	$user = 'root';
	$pw = '';
	$con = mysql_connect($servidor,$user,$pw);
	mysql_select_db($bd, $con);
	mysql_set_charset('utf8');
    
    echo json_encode( queryAll($_GET['ultimo'],$con) );
} else {
	echo "No has pasado los parámetros correctos. Debes pasar 'ultimo'";
}
?>



















