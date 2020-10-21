window.onload = function() {
}
document.addEventListener("DOMContentLoaded",function(){
	// CAMINO 1 hacia la función "comprobarNumero"
	const textNumero = document.querySelector("#textNumero")
	textNumero.addEventListener("keyup",comprobarNumero)
	
	// CAMINO 2 hacia la función "comprobarNumero"
	const botonNumero = document.querySelector("#botonNumero")
	botonNumero.addEventListener("click",comprobarNumero)
})

function comprobarNumero(e){
	
	/* PARA MOSTRAR EN LA WEB QUÉ TECLA SE HA PULSADO
	document.querySelector("#key").textContent = e.key
	document.querySelector("#which").textContent = e.which
	document.querySelector("#keycode").textContent = e.keyCode
	*/
	
	/* e.which / e.keycode / e.key para consultar
	   la tecla pulsada (13 = Enter)
	if (e.which == 13) {
	if (e.keycode == 13) {
	*/
	console.log(e)
	if ((e.key && e.key == "Enter") || e.type=="click") {
		//acciones que quieras ejecutar tras el INTRO
		if (textNumero.value.trim() != ""
			&& !isNaN(textNumero.value.trim()))
			alert("Has escrito un número correcto")
		else
			alert("ERROR")
	}
}

