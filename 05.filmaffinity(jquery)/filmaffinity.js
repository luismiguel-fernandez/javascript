//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EXAMEN

(function(){
	let x = 3
	//Escribe aquí todo tu código
	console.log("Empieza la ejecución");
	$(document).ready(main);

	//Capturar el clic de las sugerencias "<P>" (delegación de eventos)
	$("#divSugerencias").on("click","p",function(){
		consultarPorID($(this).data("id"),$(this).data("tipo"))
	})
	//Capturar el clic de los resultados "<LI>" de cada una de las 3 listas (delegación de eventos)
	$("#divResultados").on("click","li",function(){
		consultarPorID($(this).data("id"),$(this).data("tipo"))
	})

function main() {
	$("#buscador").keyup(function(ev){
		//comprobar si hay un patron escrito para buscar en la BD
		let patron = $(this).val().trim()
		let $divSugerencias = $("#divSugerencias").empty()
		if ( patron.length ) {
			//consultar este patron en la BD
			$.ajax({
				url: "search.php",
				method: "GET",
				data: {
					p: patron
				},
				success: function(json){
					//cada elemento del JSON tiene que insertarse en el DIV del chat
					let $json = jQuery.parseJSON(json)
					for (let i=0; i<$json.length; i++) {
						let texto = $json[i].texto
						let $nuevoP = $("<p>")
										.html(texto)
										.data("id",$json[i].id)
										.data("tipo",$json[i].tipo)
										.appendTo($divSugerencias)
					}
					if ($json.length)
						$divSugerencias.show()
					else 
						$divSugerencias.hide()
				},
				error: function(error) {
					alert("error en la llamada AJAX")
				}
			}) //AJAX
		} //IF
		else {
			$divSugerencias.hide()
		}

	})
	
} //function MAIN

function consultarPorID(id,tipo) {
	$.ajax({
		url: "search.php",
		method: "GET",
		data: {
			id: id,
			t: tipo
		},
		success: function(respuestaXML){
			//procesar el XML y colocar cada tipo de dato en su DIV correspondiente
			let $xml = $(respuestaXML)
			let $resultados = $xml.find("resultado")

			//localizar las 3 listas (películas = 0, directores = 1, actores = 2)
			let $ulPeliculas = $(".listaResultados").eq(0).empty()
			let $ulDirectores = $(".listaResultados").eq(1).empty()
			let $ulActores = $(".listaResultados").eq(2).empty()

			let x:String = "hola"
			x = 2

			$resultados.each(function(){
				let tipo = $(this).find("tipo").html()
				switch (tipo) {
					case "0":
						//Es una película
						$("<LI>")
							.html( $(this).find("titulo").html() )
							.data("id", $(this).find("id").html() )
							.data("tipo", "tit")
							.appendTo($ulPeliculas)
						break;
					case "1":
						//Es un director o directora
						$("<LI>")
							.html( $(this).find("nombre").html() )
							.data("id", $(this).find("id").html() )
							.data("tipo", "dir")
							.appendTo($ulDirectores)
						break;
					case "2":
						//Es un actor o actriz
						$("<LI>")
							.html( $(this).find("nombre").html() )
							.data("id", $(this).find("id").html() )
							.data("tipo", "act")
							.appendTo($ulActores)
						break;
					
				} // SWITCH
			}) // EACH
		},
		error: function(error) {
			alert("error en la llamada AJAX")
		}
	}) //AJAX
}


})();