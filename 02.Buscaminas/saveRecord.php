<?php 

if(isset($_POST['modo'])&&isset($_POST['tiempo'])&&isset($_POST['nick'])) {
	$server = "mysql:dbname=buscaminas";
	$user = "root";
	$pass = "";
	$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
	$result = array();
	
	$consulta = "INSERT INTO puntuaciones(modo,tiempo,nick) VALUES (?,?,?)";
	$sen = $con->prepare($consulta);
	$sen->bindParam(1,$_POST['modo']);
	$sen->bindParam(2,$_POST['tiempo']);
	$sen->bindParam(3,$_POST['nick']);
	$sen->execute();
}
else {
	$resp = array();
	$resp[] = "Ha habido algún error en el envío de parámetros";
	echo json_encode($resp, JSON_UNESCAPED_UNICODE);
}
?>