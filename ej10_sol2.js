document.addEventListener("DOMContentLoaded",function(){
	const places = ["Abanilla","Abarán","Águilas","Albudeite","Alcantarilla","Alcázares (Los)","Aledo","Alguazas","Alhama de Murcia","Archena","Beniel","Blanca","Bullas","Calasparra","Campos del Río","Caravaca de la Cruz","Cartagena","Cehegín","Ceutí","Cieza","Fortuna","Fuente Álamo de Murcia","Jumilla","Librilla","Lorca","Lorquí","Mazarrón","Molina de Segura","Moratalla","Mula","Murcia","Ojós","Pliego","Puerto Lumbreras","Ricote","San Javier","San Pedro del Pinatar","Santomera","Torre-Pacheco","Torres de Cotillas (Las)","Totana","Ulea","Unión (La)","Villanueva del Río Segura","Yecla"]

	const search2 = document.querySelector("#search2")
	const listaResult2 = document.querySelector("#listaResult2")
	const placeTable = document.querySelector("#solution2 table.table")
	const form2 = document.querySelector("#solution2 form")

	search2.focus()

	form2.addEventListener("submit",function(e){
		//impedir que el formulario se envíe al pulsar INTRO o 
		// clicar en un boton SUBMIT dentro del FORM
		e.preventDefault()
	})
	
	places.forEach(function(elemento){
		let nuevoOption = document.createElement("OPTION")
		nuevoOption.value = elemento
		listaResult2.appendChild(nuevoOption)
	})

	search2.addEventListener("keyup",function(e){
		if (e && e.key == "Enter") {
			addItemToTable(search2.value,placeTable)
			//vaciar caja
			search2.value = ""
			//poner de nuevo el foco en la caja
			search2.focus()
		}
	})

	//recuperar el botón ADD que corresponde al input que acabo de programar
	// recordatorio: no tiene ID --> recuperar por consanguinidad
	//alternativa 1
	//const button = search1.parentElement.nextElementSibling
	//alternativa 2
	const button = document.querySelector("#solution2 form button.btn-primary")
	button.addEventListener("click",function(){
		addItemToTable(search2.value,placeTable)
		//vaciar caja
        search2.value = ""
        //poner de nuevo el foco en la caja
        search2.focus()
	})

	//DELEGACIÓN DE EVENTOS: que los clics sobre los LI los gestione el propio UL (padre)
	placeList.addEventListener('click', e => {
		//1. Quitar la clase active a algún posible LI que la tenga
		let activo = this.querySelector("li.active")
		if (activo) 
			activo.classList.remove("active")
		//2. Dar la clase active
		e.target.classList.add("active")
	})

	document.querySelector("#btnFirst").addEventListener("click", () => {
		let activo = placeList.querySelector("li.active")
		if (activo) {
			placeList.prepend(activo)
		}
	})
	
	document.querySelector("#btnLast").addEventListener("click", () => {
		let activo = placeList.querySelector("li.active")
		if (activo) {
			placeList.append(activo)
		}
	})

	document.querySelector("#btnUp").addEventListener("click", () => {
		console.log("holas")
		let activo = placeList.querySelector("li.active")
		if (activo && activo.previousElementSibling) {
			//mover-colocar el elemento activo como hermano anterior a su actual anterio
			placeList.insertBefore( activo , activo.previousElementSibling )
		}
	})

	document.querySelector("#btnDown").addEventListener("click", () => {
		let activo = placeList.querySelector("li.active")
		if (activo && activo.nextElementSibling) {
			placeList.insertBefore( activo.nextElementSibling , activo)
		}
	})

	/*
		padre.appendChild(nodo hijo)
		padre.append("nodo hijo o varios nodos hijos")
		padre.prepend(nodo hijo o varios nodos hijos)

		nodo.previousElementSibling
		nodo.nextElementSibling

		padre.insertBefore( nodo hijo a insertar, nodo hijo de referencia)

	*/

	document.querySelector("#btnRemove").addEventListener("click", () => {
		let activo = placeList.querySelector("li.active")
		if (activo)
			activo.remove()
	})

}) //EVENTO DOMCONTENTLOADED

function addItemToTable(item,table){
	if (item.trim().length) {
        //crear un nuevo TR e insertarlo como último hijo del TBODY
        let nuevoTR = document.createElement("TR")
        let nuevoTD1 = document.createElement("TD")

        let totalFilasActual = table.querySelectorAll("tbody tr").length      
        nuevoTD1.textContent = totalFilasActual + 1

        let nuevoTD2 = document.createElement("TD")
        nuevoTD2.textContent = item
        let nuevoTD3 = document.createElement("TD")
        nuevoTD3.innerHTML = '<div class="row"> \
            <button type="button" class="btn btn-secondary btn-sm">&#8593;</button> \
            <button type="button" class="btn btn-secondary btn-sm">&#8595;</button> \
            <button type="button" class="btn btn-danger btn-sm">X</button> \
            </div>'
        nuevoTD3.lastElementChild.addEventListener("click", () => {
            nuevoTR.remove()
            //equivalentes
            //this.parentElement.parentElement.remove()
        })


        nuevoTR.append(nuevoTD1,nuevoTD2,nuevoTD3)
        table.querySelector("tbody").append(nuevoTR)
    }
}

/*
    <tr>
        <td>1</td>
        <td>Caravaca</td>
        <td>
            
        </td>
    </tr>
*/