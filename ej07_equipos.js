document.addEventListener("DOMContentLoaded",function(){
	const equipo1 = document.querySelector("#equipo1")
	const equipo2 = document.querySelector("#equipo2")
	//const jugIniciales = document.querySelectorAll("#equipo1 li")
	const jugIniciales = equipo1.querySelectorAll("li")
	
	//console.log(jugIniciales)
	
	/* recorrer la lista de nodos de manera clásica
	for (let i=0; i<jugIniciales.length; i++) {
		jugIniciales[i].addEventListener("click", function(){
			if (this.parentNode.id == "equipo1")
				equipo2.appendChild(this)
			else
				equipo1.appendChild(this)
		})
	}*/
	
	// recorrer la lista de nodos con forEach de Javascript
	jugIniciales.forEach(function(ele){
		ele.addEventListener("click", function(){
			if (this.parentNode.id == "equipo1")
				equipo2.appendChild(this)
			else
				equipo1.appendChild(this)
		})
	})
	
})








