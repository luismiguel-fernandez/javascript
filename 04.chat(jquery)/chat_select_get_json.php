<?php
if(isset($_GET['ultimo'])) {
   
    $server = "mysql:dbname=chat";
    $user = "root";
    $pass = "";
    $con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
    
    $consulta = "SELECT * FROM mensajes WHERE id > ".$_GET['ultimo'];
    $sen = $con->prepare($consulta);
    $sen->execute();

    echo json_encode( $sen->fetchAll(PDO::FETCH_ASSOC) );
} else {
	echo "No has pasado los parámetros correctos. Debes pasar 'ultimo'";
}
?>



















