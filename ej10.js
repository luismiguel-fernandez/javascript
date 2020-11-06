document.addEventListener("DOMContentLoaded",function(){
	const places = ["Abanilla","Abarán","Águilas","Albudeite","Alcantarilla","Alcázares (Los)","Aledo","Alguazas","Alhama de Murcia","Archena","Beniel","Blanca","Bullas","Calasparra","Campos del Río","Caravaca de la Cruz","Cartagena","Cehegín","Ceutí","Cieza","Fortuna","Fuente Álamo de Murcia","Jumilla","Librilla","Lorca","Lorquí","Mazarrón","Molina de Segura","Moratalla","Mula","Murcia","Ojós","Pliego","Puerto Lumbreras","Ricote","San Javier","San Pedro del Pinatar","Santomera","Torre-Pacheco","Torres de Cotillas (Las)","Totana","Ulea","Unión (La)","Villanueva del Río Segura","Yecla"]

	const search1 = document.querySelector("#search1")
	const listaResult1 = document.querySelector("#listaResult1")
	const placeList = document.querySelector("#placeList")
	const form1 = document.querySelector("#solution1 form")

	search1.focus()

	form1.addEventListener("submit",function(e){
		//impedir que el formulario se envíe al pulsar INTRO o 
		// clicar en un boton SUBMIT dentro del FORM
		e.preventDefault()
	})
	
	places.forEach(function(elemento){
		let nuevoOption = document.createElement("OPTION")
		nuevoOption.value = elemento
		listaResult1.appendChild(nuevoOption)
	})

	search1.addEventListener("keyup",function(e){
		if (e && e.key == "Enter") {
			addItemToList(search1.value,placeList)
			//vaciar caja
			search1.value = ""
			//poner de nuevo el foco en la caja
			search1.focus()
		}
	})

	//recuperar el botón ADD que corresponde al input que acabo de programar
	// recordatorio: no tiene ID --> recuperar por consanguinidad
	//alternativa 1
	//const button = search1.parentElement.nextElementSibling
	//alternativa 2
	const button = document.querySelector("#solution1 form button.btn-primary")
	button.addEventListener("click",function(){
		addItemToList(search1.value,placeList)
		//vaciar caja
        search1.value = ""
        //poner de nuevo el foco en la caja
        search1.focus()
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

	document.querySelector("#btnRemove").addEventListener("click", () => {
		let activo = placeList.querySelector("li.active")
		if (activo)
			activo.remove()
	})

}) //EVENTO DOMCONTENTLOADED

function addItemToList(item,list){
	if (item.trim().length) {
        //crear un nuevo LI con el texto de la caja
        let nuevoLI = document.createElement("LI")
		nuevoLI.textContent = item.trim()
		nuevoLI.classList.add("list-group-item")
        //insertarlo en la lista
		list.appendChild(nuevoLI)
		//hacerlo clicable
		// ---no hacerlo aquí, sino en la propia lista 1 sola vez---
    }
}