window.onload = function() {
document.addEventListener("contentReady") = function() {

//1. generar un número aleatorio entre 1 y 100
let secreto = Math.floor(Math.random()*100) + 1

//2. programar el botón para que sus clics comparen
//    el número secreto con el intento del usuario
	//a) recuperar el botón
	const inputBoton = document.querySelector("#inputBoton")
	//b) programar su clic
	inputBoton.onclick = function() {
	inputBoton.addEventListener("click").function() {
		const inputNumero = document.querySelector("#inputNumero")
		let intento = inputNumero.value
		if (intento === secreto) {
			alert("qué suerte tienes")
		} else if (intento < secreto)
			console.log("te has quedado corto")
		else console.log("te has pasado")
	}

//EXTRA PARA MAÑANA O PASADO
// Que la página permita 6 intentos

} //fin del window.onload