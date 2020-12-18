<?php 

if(isset($_POST['modo'])&&isset($_POST['length'])) {
	$server = "mysql:dbname=buscaminas";
	$user = "root";
	$pass = "";
	$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
	$result = array();
	
	$consulta = "SELECT * FROM puntuaciones WHERE modo=".$_POST['modo']." ORDER BY tiempo ASC LIMIT ".$_POST['length'];
	$sen = $con->prepare($consulta);
	$sen->execute();

	while($row = $sen->fetch(PDO::FETCH_NAMED)){
		$result[] = $row;
	}
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}
else {
	$resp = array();
	$resp[] = "Ha habido algún error en el envío de parámetros";
	echo json_encode($resp, JSON_UNESCAPED_UNICODE);
}
?>
