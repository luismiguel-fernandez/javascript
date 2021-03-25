//OPCION 1
document.addEventListener("DOMContentLoaded", main)
function main() {
    irASeccion(0)
    //programar menú navegación
    const seccionesMenu = document.querySelectorAll("#navbarNav a")
    for (let i = 0; i < seccionesMenu.length; i++) {
        seccionesMenu[i].addEventListener("click", function () {
            irASeccion(i)
        })
    }
    //programar el INPUT
    const patronInput = document.querySelector("#patron")
    patronInput.addEventListener("keyup", patronTeclaPulsada)
    //programar los CLICK de la tabla resultados

    //programar el botón de ejemplo que abre la ventana MODAL-1
    let boton = document.querySelector("#moreInfo")
    boton.addEventListener("click",function(){
        MicroModal.show('modal-1')
    })
}

function irASeccion(i) {
    const secciones = document.querySelectorAll("#secciones>div.row")
    //ocultar todas las secciones
    secciones.forEach(seccion => seccion.style.display = "none")
    //mostrar la sección i (alternativa elegante)
    secciones[i].style.display = "block"
}

function patronTeclaPulsada(ev) {
    // ev.target es el elemento HTML que ha recibido la acción
    //recoger el patrón (lo escrito en el INPUT)
    let patron = ev.target.value.trim()
    console.log(patron)
    if (patron.length) {
        //si es un ENTER o FLECHAS
        // tratar esos casos particulares

        //si no
        //hacer búsqueda con ese patrón
        let url = "http://www.omdbapi.com/?apikey=36b5d963&s=" + patron
        fetch(url)
            .then(function (respuesta) {
                //llega del servidor texto plano
                return respuesta.json()
            })
            .then(function (json) {
                //ya tenemos la respuesta del servidor convertida a JSON
                //console.log(json['Search'][0].Title)
                if (json.Response == "False") {
                    //mostrar al usuario que hay demasiados resultados
                } else {
                    //pasar los resultados del JSON al DATALIST
                    const cuerpo = document.querySelector("#resul tbody")
                    cuerpo.innerHTML = ""
                    for (let i = 0; i < json['Search'].length; i++) {
                        // let nuevoOption = document.createElement("OPTION")
                        // nuevoOption.value = json['Search'][i].Title
                        // dl.append(nuevoOption)
                        let nuevaFila = cuerpo.insertRow(-1)
                        let celdaCaratula = nuevaFila.insertCell(0)
                        let celdaTitulo = nuevaFila.insertCell(1)
                        celdaCaratula.innerHTML = "<img style='max-width:10%;' src='" + json['Search'][i].Poster + "'>"
                        celdaTitulo.textContent = json['Search'][i].Title + " (" + json['Search'][i].Year + ")"
                    }
                    //dar de nuevo el foco al INPUT
                    ev.target.focus()
                }

            }).catch((error) => { console.log("Error", error) })

        //procesar resultados
        //if (ha sido un ENTER o no)
    }

}
 
/*OPCION 2
window.onload = function() {
    let patron = document.querySelector("#patron")
}
*/