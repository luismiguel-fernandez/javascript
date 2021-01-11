//asegurarnos de que nuestro código empieza a ejecutarse
// cuando el árbol DOM ya está construido

$(document).ready(main)

function main() {
    idUltimoMensajeRecibido = 0
    $("#texto").keyup(function(ev){
        if (ev.key === "Enter") {
            //comprobar que el campo NICK es válido
            //comprobar que el campo TEXTO es válido
            $.ajax({
                url: "chat_insert_post.php",
                method: "POST",
                data: {
                    nick: $("#nick").val(),
                    texto: $("#texto").val()
                },
                success: function(respuesta){
                    console.log("La inserción se ha hecho bien")
                },
                error: function(error){
                    console.log("Error en la inserción: "+error)
                }
            })
        }
    })

    //cargar histórico de mensajes
    cargarMensajes(0)

    //programas consultas periódicas al servidor para ver si hay mensajes nuevos
    setInterval(function(){
                    cargarMensajes(idUltimoMensajeRecibido)
                },2000)
}

function cargarMensajes(inicio){
    $.ajax({
        url: "chat_select_get_json.php",
        method: "GET",
        data: {
            ultimo: inicio
        },
        success: function(json){
            //cada elemento del JSON tiene que insertarse en el DIV del chat
            let $json = jQuery.parseJSON(json)
            for (let i=0; i<$json.length; i++) {
                let $chat = $("#chat")
                let $nuevoMensaje = $("<DIV>").html($json[i].instante + " >> " + $json[i].nick + ":" + $json[i].texto)
                $chat.append($nuevoMensaje)
                idUltimoMensajeRecibido = $json[i].id
            }
            console.log("idUltimoMensajeRecibido:" + idUltimoMensajeRecibido)

        },
        error: function(error){
            console.log("Error en la consulta: "+error)
        }
    })
}


