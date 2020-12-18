<?php 

if(isset($_POST['nick'])&&isset($_POST['puntos'])) {
	$server = "mysql:dbname=records";
	$user = "root";
	$pass = "";
	$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
	$result = array();
	
	$consulta = "INSERT INTO records(nick,puntos) VALUES (?,?)";
	$sen = $con->prepare($consulta);
	$sen->bindParam(1,$_POST['nick']);
	$sen->bindParam(2,$_POST['puntos']);
	$sen->execute();
	
	$consulta = "SELECT * FROM records ORDER BY puntos DESC LIMIT 5";
	$sen = $con->prepare($consulta);
	$sen->execute();

	while($row = $sen->fetch(PDO::FETCH_NAMED)){
		$result[] = $row;
	}
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}
else {
	echo "No has pasado los parámetros correctos";
}
?>
