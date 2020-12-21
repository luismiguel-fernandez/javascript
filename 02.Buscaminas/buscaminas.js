// Esto no lo vamos a poner (no es necesario)
// porque hemos puesto el atributo DEFER en SCRIPT de HTML:
// document.addEventListener("DOMContentLoaded",main);
// function main() {}

const ALTO = 11
const ANCHO = 11
const NUMMINAS = 115
const tablero = document.querySelector("#tablero")
const inputFila = document.querySelector("#inputFila")
const inputColumna = document.querySelector("#inputColumna")
const inputMina = document.querySelector("#inputMina")

let celdasDestapadas = 0
let maxNumCeldasSinMina = ALTO * ANCHO - NUMMINAS

generarTablero(ANCHO, ALTO)
colocarMinas(ANCHO, ALTO, NUMMINAS)
configurarRaton()

//iniciar crono

mostrarModosJuego()
//mostrarRecords()

function calcularMinasAlrededor(celda) {
    let fila = parseInt(celda.dataset.fila)
    let columna = parseInt(celda.dataset.columna)
    let contadorMinas = 0
    const todasLasCeldas = document.querySelectorAll(".celda")
    //mirar en la celda de arriba a la izquierda

    //mirar en la celda de arriba centro
    if (fila > 0) {
        let numCeldaArriba = (fila*ANCHO + columna) - ANCHO 
        let celdaArriba = todasLasCeldas[numCeldaArriba]
        if (celdaArriba.dataset.mina === "true")
            contadorMinas++
    }
    //mirar en la celda de abajo
    if (fila < (ALTO-1)) {
        let numCeldaAbajo = (fila*ANCHO + columna) + ANCHO
        let celdaAbajo = todasLasCeldas[numCeldaAbajo]
        if (celdaAbajo.dataset.mina === "true")
            contadorMinas++
    }
    //mirar en la celda de la izquierda
    if (columna > 0) {
        if (celda.previousSibling.dataset.mina === "true")
            contadorMinas++
    }
    //mirar en la celda de la derecha
    if (columna < (ANCHO-1)) {
        if (celda.nextSibling.dataset.mina === "true")
            contadorMinas++
    }
    //mirar en las celdas de abajo (si las hay)

    return contadorMinas
}

function colocarMinas(ancho, alto, numMinas) {
    //Establecer las minas aleatoriamente
    let minasPorColocar = numMinas
    const todasLasCeldas = document.querySelectorAll(".celda")
    while (minasPorColocar > 0) {
        let aleatorio = Math.floor(Math.random() * alto * ancho)
        if (todasLasCeldas[aleatorio].dataset.mina === "false") {
            //colocar mina y decrementar contador
            todasLasCeldas[aleatorio].dataset.mina = true
            minasPorColocar--
        }
    }
}

function comprobarVictoria() {
    //comprobar si se han destapado todas las celdas que no tienen mina
    if (celdasDestapadas == maxNumCeldasSinMina) {
        //parar el crono
        alert("Has ganado")
        const todasLasCeldas = Array.from(document.querySelectorAll(".celda"))
        todasLasCeldas.forEach((element, index) => {
            // 1) anular el clic para que el usuario no pueda seguir jugando
            element.dataset.clicado = true
        })
        //2ª comunicación AJAX con fetch (para llamar al saveRecord.php)
        const params = new URLSearchParams("modo=1&tiempo=5&nick=Nuevo")
        const opciones = {
            method: 'POST',
            body: params
        }
        fetch("saveRecord.php",opciones)
            .then(function(respuesta){
                if (!respuesta.ok)
                    throw "Algo ha fallado al intentar guardar un récord"
            }).catch(function (err) {
                console.log("ERROR:" + err)
            })
    }
    
}

function configurarRaton() {
    //Evitar la aparición del menú contextual del ratón sobre el tablero
    tablero.addEventListener("contextmenu", (ev) => {
        ev.preventDefault()
        //return false
    })
    //Actualizar información de celda cuando el puntero sobrevuela una celda
    tablero.addEventListener("mouseover", (ev) => {
        if (ev.target.classList.contains("celda")) {
            inputFila.value = ev.target.dataset.fila
            inputColumna.value = ev.target.dataset.columna
            inputMina.value = ev.target.dataset.mina
        }
    })
    //Clic izquierdo para destapar celdas y clic derecho para gestionar banderas
    tablero.addEventListener("mouseup", (ev) => {
        if (ev.target.classList.contains("celda")) {
            let celda = ev.target
            if (ev.button === 0) {
                //clic izquierdo
                if (!celda.classList.contains("celda_bandera")
                    && (celda.dataset.clicado === "false")) {
                    celda.dataset.clicado = true
                    if (celda.dataset.mina === "true") {
                        celda.classList.add("mina_explotada")
                        perderPartida()
                    } else {
                        let alrededor = calcularMinasAlrededor(celda)
                        celda.classList.add("celda_clicada"+alrededor)
                        celdasDestapadas++
                        comprobarVictoria()
                    }
                }
            } else if (ev.button === 2) {
                //clic derecho
                //gestionar banderas
                if (celda.dataset.clicado === "false") {
                    celda.classList.toggle("celda_bandera")
                }
            }
        }
    })
}



function generarTablero(ancho, alto) {
    let totalCeldas = alto * ancho
    for (let i = 0; i < totalCeldas; i++) {
        let nuevaCelda = document.createElement("DIV")
        nuevaCelda.classList.add("celda")
        nuevaCelda.dataset.fila = Math.floor(i / ancho)
        nuevaCelda.dataset.columna = i % ancho
        nuevaCelda.dataset.clicado = false
        nuevaCelda.dataset.mina = false
        tablero.append(nuevaCelda)
    }


}

function perderPartida() {
    //terminar la partida perdiendo
    const todasLasCeldas = Array.from(document.querySelectorAll(".celda"))
    todasLasCeldas.forEach((element, index) => {
        // 1) anular el clic para que el usuario no pueda seguir jugando
        element.dataset.clicado = true
        element.textContent = index
        // 2) desvelar todo el tablero
        if (element.dataset.mina === "true")
            element.classList.add("mina")
        else
            element.classList.add("celda_clicada")
    })
}

function mostrarModosJuego(){
    const params = new URLSearchParams("modo=1&length=5")
    const opciones = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: params // body data type must match "Content-Type" header
    }
    fetch('loadRecords.php',opciones)
        .then(function(respuesta){
            //llega del servidor texto plano
            return respuesta.json()
        })
        .then(function(json){
            //console.log("Respuesta ya en formato JSON: " + respuesta)
            const records = document.querySelector("#records")
            let tablaModo1 = document.createElement("TABLE")
            let encabezado = document.createElement("THEAD")
            let fila = encabezado.insertRow(-1)
            let col1 = document.createElement("TH")
            let col2 = document.createElement("TH")
            col1.textContent = "Jugador"
            col2.textContent = "Tiempo (s)"
            fila.append(col1,col2)
            encabezado.append(fila)
            tablaModo1.append(encabezado)
            records.append(tablaModo1)
            let cuerpo = document.createElement("TBODY")
            tablaModo1.append(cuerpo)
            
            json.forEach(element => {
                //creación tabla HTML para mostrar los records del JSON
                let fila = cuerpo.insertRow(-1)
                let celda1 = fila.insertCell(-1)
                let celda2 = fila.insertCell(-1)
                celda1.textContent = element.nick
                celda2.textContent = element.tiempo 
            })
        })
}