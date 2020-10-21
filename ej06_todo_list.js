document.addEventListener("DOMContentLoaded",function(){
	//esto se va a ejecutar sólo cuando el navegador
	// haya terminado de crear el árbol DOM desde el HTML
	const lista = document.querySelector("#todoList")
	const btnAdd = document.querySelector("#btnAdd")
	const inputText = document.querySelector("#inputText")
	
	//0.dar el foco a la caja de texto (ahora mismo está resuelto con
	// el atributo HTML "autofocus")
	// document.querySelector("#inputText").focus()
	
	//1.programar el evento clic del BUTTON
	
	btnAdd.addEventListener("click",addItemToList)
	
	//2.programar el evento "pulsar INTRO" del INPUT
	inputText.addEventListener("keyup",function(e){
		if (e && e.key === "Enter")
			addItemToList()
	})	


	function addItemToList(){
		let texto = inputText.value
		if (texto.trim().length) { // 0 = false, cualquier otro = true
			//añadir ese texto como nuevo elemento de la lista
			
			//1.crear un nuevo elemento HTML <LI>
			let nuevoLI = document.createElement("LI")
			
			//2.insertar el texto dentro del <LI>
			nuevoLI.textContent = texto
			
			//3.hacer que el <LI> se añada al árbol DOM
			// como hijo de <UL>
			lista.appendChild(nuevoLI)
			
			//4.hacer que el <LI> sea clicable para que se elimine
			nuevoLI.addEventListener("click",function(){
				this.remove()
			})
			
			//EXTRA: volver a colocar el FOCO en la caja de texto
			//y vaciar la caja de texto
			inputText.focus()
			inputText.value = ""
		}
	} //fin function addItemToList

}) //fin DOMContentLoaded





