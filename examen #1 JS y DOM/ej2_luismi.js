//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EJERCICIO 2 DEL EXAMEN
(function() {
    //todo tu codigo js aqui
	let actual = 0
	let celdas
	let intervalo
	const empezar = document.querySelector("#empezar")
	const parar = document.querySelector("#parar")
	
	document.addEventListener("DOMContentLoaded",function() {
		const segundos = document.querySelector("#segundos tbody")
		let nuevoTR = document.createElement("TR")
		segundos.append(nuevoTR)
		for (let i=0; i<60; i++) {
			let nuevoTD = document.createElement("TD")
			nuevoTR.append(nuevoTD)
		}
		celdas = document.querySelectorAll("#segundos tbody td")
	})
	
	parar.setAttribute("disabled",true)
	
	empezar.addEventListener("click", function(){
		intervalo = setInterval(colorearCelda, 300)
		this.setAttribute("disabled",true)
		parar.disabled = false
	})
	parar.addEventListener("click", function(){
		clearInterval(intervalo)
		this.setAttribute("disabled",true)
		empezar.disabled = false
	})

	function colorearCelda(){
		celdas[actual].classList.toggle("coloreado")
		actual = ++actual % 60
	}

})();





