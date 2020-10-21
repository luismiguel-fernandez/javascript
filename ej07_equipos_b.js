document.addEventListener("DOMContentLoaded",function(){
	const equipo1 = document.querySelector("#equipo1")
	const equipo2 = document.querySelector("#equipo2")
	const jugIniciales = equipo1.querySelectorAll("li")
	
	// recorrer la lista de nodos con forEach de Javascript
	jugIniciales.forEach(function(ele){
		ele.addEventListener("dblclick", function(){
			//todos los LI seleccionados saltan al otro equipo
			const seleccionados = document.querySelectorAll(".seleccionado")
			seleccionados.forEach(function(elem){
				//que salte hacia la lista contraria
				if (elem.parentNode.id == "equipo1")
					equipo2.appendChild(elem)
				else
					equipo1.appendChild(elem)
				//que pierda el color amarillo
				elem.classList.remove("seleccionado")
			})
		})
		ele.addEventListener("click", function(){
			//el LI recibe clase CSS que lo coloree en amarillo
			// si ya tiene esa clase, se la quitamos (interruptor)
			this.classList.toggle("seleccionado")
		})
	})
	
})








