//Desarrolla aquí la solución al ejercicio 11
document.addEventListener("DOMContentLoaded",function(){

	const select1 = document.querySelector("#selectNuevoAtrib")

	//alternativa:
	//por delegación de eventos, podemos programar toda la tabla para que
	// los futuros botones X borren la fila correspondiente
	// (LO HACEMOS EL LUNES)
	const tabla = document.querySelector("#tablaContacto")
	tabla.addEventListener("click", e => {
		if (e.target.classList.contains("botonBorrar"))
			//localizar el abuelo del BUTTON (que es el TR) y borrarlo
			e.target.parentElement.parentElement.remove()
	})

	select1.addEventListener("change", (ev) => {
		const cuerpo = document.querySelector("#tablaContacto tbody")
		let opcion = ev.target.value
		if (opcion != 0) {
			//añadir una fila a la tabla
			let nuevoTR = document.createElement("TR")
			
			let nuevoTD1 = document.createElement("TD")
			let nuevoTD2 = document.createElement("TD")
			let nuevoTD3 = document.createElement("TD")
			
			let nuevoIMG = document.createElement("IMG")
			let nuevoINPUT = document.createElement("INPUT")
			let nuevoBUTTON = document.createElement("BUTTON")

			// <IMG class="small-icon">
			nuevoIMG.classList.add("small-icon")

			if (opcion == 1) {
				nuevoIMG.src = "img/tlfn.png"
				nuevoINPUT.type = "tel"
			} else {
				nuevoIMG.src = "img/email.png"
				nuevoINPUT.type = "email"
			}

			// <input type="button" value="X">
			// <button>X</button>
			nuevoBUTTON.textContent = "X"
			nuevoBUTTON.classList.add("botonBorrar")
			
			//esto de abajo ya no es necesario porque arriba
			// lo hemos programado con delegacion de eventos
			/*nuevoBUTTON.addEventListener("click", () => {
				nuevoTR.remove()
			})*/

			nuevoTD1.append(nuevoIMG)
			nuevoTD2.append(nuevoINPUT)
			nuevoTD3.append(nuevoBUTTON)
			nuevoTR.append(nuevoTD1,nuevoTD2,nuevoTD3)
			cuerpo.append(nuevoTR)
		}
	})
	
})