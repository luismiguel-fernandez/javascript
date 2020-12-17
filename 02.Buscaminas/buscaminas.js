// Esto no lo vamos a poner (no es necesario)
// porque hemos puesto el atributo DEFER en SCRIPT de HTML:
// document.addEventListener("DOMContentLoaded",main);
// function main() {}

const ALTO = 11
const ANCHO = 11
const NUMMINAS = 10
const tablero = document.querySelector("#tablero")
const inputFila = document.querySelector("#inputFila")
const inputColumna = document.querySelector("#inputColumna")
const inputMina = document.querySelector("#inputMina")

generarTablero(ANCHO, ALTO)
colocarMinas(ANCHO, ALTO, NUMMINAS)
configurarRaton()

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

function configurarRaton() {
    //Evitar la aparición del menú contextual del ratón sobre el tablero
    tablero.addEventListener("contextmenu", (ev) => {
        ev.preventDefault()
        return false
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
    tablero.addEventListener("click", (ev) => {
        if (ev.target.classList.contains("celda")) {
            let celda = ev.target
            if (ev.button === 0) {
                //clic izquierdo
                if (celda.dataset.clicado === "false") {
                    celda.dataset.clicado = true
                    if (celda.dataset.mina === "true") {
                        celda.classList.add("mina_explotada")
                        perderPartida()
                    } else {
                        celda.classList.add("celda_clicada")
                    }
                }
            } else if (ev.button === 2) {
                console.log("mousedown")
                //clic derecho
                //gestionar banderas
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