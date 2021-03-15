//OPCION 1
document.addEventListener("DOMContentLoaded",main)
function main() {
    //programar menú navegación
    const seccionesMenu = document.querySelectorAll("#navbarNav a")
    console.log(seccionesMenu)
    for (let i=0; i<seccionesMenu.length; i++) {
        seccionesMenu[i].addEventListener("click",function(){
            irASeccion(i)
        })
    }
    //programar el INPUT
    const patronInput = document.querySelector("#patron")
    patronInput.addEventListener("keyup",patronTeclaPulsada)
}

function irASeccion(i) {
    //ocultar las 4 secciones
    document.querySelector("#inicio").style.display = "none"
    document.querySelector("#favoritos").style.display = "none"
    document.querySelector("#buscador").style.display = "none"
    document.querySelector("#agradecimientos").style.display = "none"
    //mostrar la sección i
    if (i==0)
        document.querySelector("#inicio").style.display = "block"
    else if (i==1)
        document.querySelector("#favoritos").style.display = "block"
    else if (i==2)
        document.querySelector("#buscador").style.display = "block"
    else if (i==3)
        document.querySelector("#agradecimientos").style.display = "block"
}

function patronTeclaPulsada(ev) {
    // ev.target es el elemento HTML que ha recibido la acción
    //recoger el patrón (lo escrito en el INPUT)
    console.log(numero)
    let patron = patronInput.value.trim()
    if (patron.length) {
        //hacer búsqueda con ese patrón
        console.log(patron)
    }

    //procesaremos la respuesta del servidor para mostrar resultados

}

/*OPCION 2
window.onload = function() {
    let patron = document.querySelector("#patron")
}
*/