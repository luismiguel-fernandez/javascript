//Constantes y variables globales que no accedan al DOM
const anchuraTablero = 600
const alturaTablero = 400
const anchuraBola = 30
const alturaBola = 30

document.addEventListener("DOMContentLoaded", main)

function main() {
    //Constantes y variables que sí accedan al DOM
    const tablero = document.querySelector("#tablero")
    tablero.style.width = anchuraTablero + "px"
    tablero.style.height = alturaTablero + "px"

    //Crear una bola e insertarla en el tablero
    let bola = document.createElement("div")
    bola.classList.add("bola")
    bola.style.width = anchuraBola + "px"
    bola.style.height = alturaBola + "px"
    tablero.append(bola)

    //Hacer que el color de la bola sea aleatorio
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    
    let colorAleatorio = `rgb(${r},${g},${b})`
    //alternativa al string anterior
    //let colorAleatorio = "rgb(" + r + "," + g + "," + b + ")"

    console.log(colorAleatorio)
    bola.style.backgroundColor = colorAleatorio

    //Definir el movimiento de la bola
    let topBola = Math.floor(Math.random() * (alturaTablero - alturaBola))
    let leftBola = Math.floor(Math.random() * (anchuraTablero - anchuraBola))
    let velLeftBola = Math.random() * 2 - 1
    let velTopBola = Math.random() * 2 - 1
    function moverBola() {
        topBola = topBola + velTopBola
        bola.style.top = topBola + "px"

        leftBola = leftBola + velLeftBola
        bola.style.left = leftBola + "px"

        if (topBola >= (alturaTablero-alturaBola) || topBola <=0)
            // corregir su dirección vertical
            // cambiar de signo la variable "velVertical"
            velTopBola *= -1
        
        if (leftBola >= (anchuraTablero-anchuraBola) || leftBola <=0)
            // corregir su dirección horizontal
            velLeftBola *= -1
        
    }
    let intervalBola = setInterval(moverBola,10)
}