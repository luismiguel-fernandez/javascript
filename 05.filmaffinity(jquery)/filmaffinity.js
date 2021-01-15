//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EXAMEN

(function(){
	let x = 3
	//Escribe aquí todo tu código
	console.log("Empieza la ejecución");
	$(document).ready(main);
	//Capturar el clic de las sugerencias (delegación de eventos)
	$("#divSugerencias").on("click","p",function(){
		$(this).toggleClass("selected")
		//console.log( $(this).html() )
		$.ajax({
			url: "search.php",
			method: "GET",
			data: {
				id: $(this).data("id"),
				t: $(this).data("tipo")
			},
			success: function(xml){
				//procesar el XML y colocar cada tipo de dato en su DIV correspondiente
				
			},
			error: function(error) {
				alert("error en la llamada AJAX")
			}
		}) //AJAX
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
	
}

})();