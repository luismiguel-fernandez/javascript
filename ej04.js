document.addEventListener("DOMContentLoaded",function(){
	const botonCalcular = document.querySelector("#botonCalcular")
	botonCalcular.addEventListener("click",calcularEdad)
})

function calcularEdad(){
	const dia = document.querySelector("#inputDia").value
	const mes = document.querySelector("#inputMes").value
	const anyo = document.querySelector("#inputAnyo").value
	const salida = document.querySelector("#errores")
	
	const hoy = new Date()
	let edad = hoy.getFullYear() - anyo
	
	//si este año todavía no los he cumplido, restar 1
	if (mes > (hoy.getMonth() + 1) ) edad--
	else if (mes == (hoy.getMonth() + 1))
			if (dia > hoy.getDate()) edad--
	
	salida.textContent = "Tienes " + edad + " años"
	
	
	//prueba para aprender a seleccionar todos los
	// nodos con la misma etiqueta (INPUT, por ej.)
	const todosLosInputs = document.querySelectorAll("input")
	console.log("length = " + todosLosInputs.length)
	console.log(`longitud = ${todosLosInputs.length}`)
	
}
