//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EXAMEN
(function() {
    //todo tu codigo js aqui
	window.onload = function() {
		var formu = document.getElementById("formMovimientos");
		formu.action = "formOK.html";
		formu.onsubmit = function() {
			return validarForm();
		}
		formu.onreset = function() {
			borrarClaseErrorDeCampos();
			borrarMensajesError();
		}
	}
	
	function borrarClaseErrorDeCampos() {
		//Restaurar la clase CSS normal de los campos
		var campos = document.getElementsByTagName("input");
		for (i = 0; i < campos.length; i++) {
			campos[i].className = "campoCorrecto";
		}
		var campos = document.getElementsByTagName("select");
		for (i = 0; i < campos.length; i++) {
			campos[i].className = "campoCorrecto";
		}
	}

	function borrarMensajesError() {
		//Borrar los labels
		var labels = document.getElementsByTagName("label");
		for (i = 0; i < labels.length; i++) {
			labels[i].innerHTML = "";
		}
	}
	
	function validarForm() {
		borrarClaseErrorDeCampos();
		borrarMensajesError();
		var bandera = true;
		//Validar el campo Concepto
		var concepto = document.getElementById("concepto").value;
		var expreg1 = /^([\wÑñ\- ]){4,}$/;
		if (!expreg1.test(concepto)) {
			// Lo que el usuario ha escrito en el campo 1 no cumple la expresión regular
			document.getElementById("conceptoError").innerHTML = "El concepto no sigue el patrón esperado";
			document.getElementById("concepto").className = "campoIncorrecto";
			bandera = false;
		}
		//Validar el campo Cantidad
		var cantidad = document.getElementById("cantidad").value;
		var expreg2 = /^\d+[,]\d{2}$/;
		if (!expreg2.test(cantidad)) {
			// Lo que el usuario ha escrito en el campo 2 no cumple la expresión regular
			document.getElementById("cantidadError").innerHTML = "El número de referencia no sigue el patrón esperado";
			document.getElementById("cantidad").className = "campoIncorrecto";
			bandera = false;
		}
		//Validar el campo Tipo
		var tipo = document.getElementById("tipo").value;
		if (!tipo) {
			//El usuario no ha seleccionado un tipo de movimiento
			document.getElementById("tipoError").innerHTML = "Es necesario elegir un tipo de movimiento";
			document.getElementById("tipo").className = "campoIncorrecto";
			bandera = false;
		}
		//Devolver el valor 
		return bandera;
	}    
})();





