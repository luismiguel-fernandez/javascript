document.addEventListener("DOMContentLoaded", main)
const anchuraTablero = 600
const alturaTablero = 400
const anchuraBola = 30
const alturaBola = 30
const msIniciales = 1000
const msDecremento = 25
let tiempoInicial = 10
let reloj
let alarma
let clicSobreBola

function main() {
    const tablero = document.querySelector("#tablero")
    const bola = document.querySelector("#bola")

    //Definir las dimensiones del tablero y la bola
    tablero.style.width = anchuraTablero + "px"
    tablero.style.height = alturaTablero + "px"
    bola.style.width = anchuraBola + "px"
    bola.style.height = alturaBola + "px"
    
    clicSobreBola = function() {
        //Aumentar la puntuación
        puntos.textContent = Number(puntos.textContent) + 1

        //Que la posición se refresque inmediatamente
        // (para evitar que se haga múltiples clics sobre la misma posicion)
        cambiaPosicionBola()

        //Aumentar la velocidad a la que cambia la bola de posición
        clearInterval(alarma)
        let nuevosMilisegundos = msIniciales - msDecremento * puntos.textContent
        alarma = setInterval(cambiaPosicionBola,nuevosMilisegundos)
        velocidad.textContent = nuevosMilisegundos
    }

    const btnEmpezar = document.querySelector("#btnEmpezar")
    btnEmpezar.addEventListener("click", () => {
        //Anulamos la partida anterior, si es que la hay
        clearInterval(reloj)
        clearInterval(alarma)
        bola.removeEventListener("click",clicSobreBola)

        //Inicializar marcador de [tiempo,puntos,velocidad]
        const tiempo = document.querySelector("#tiempo")
        tiempo.textContent = tiempoInicial
        const puntos = document.querySelector("#puntos")
        puntos.textContent = 0
        const velocidad = document.querySelector("#velocidad")
        velocidad.textContent = msIniciales

        // interval para controlar el tiempo real, los segundos que van pasando
        reloj = setInterval(actualizaTiempo,1000)
        // interval que actualiza la bola de posición cada X milisegundos
        alarma = setInterval(cambiaPosicionBola,msIniciales)
        // evento clic sobre la bola para sumar puntos
        bola.addEventListener("click",clicSobreBola)
    })
}

function cambiaPosicionBola(){
    let nuevoTop = Math.floor( Math.random() * (alturaTablero - alturaBola) )
    bola.style.top = nuevoTop + "px"
    let nuevoLeft = Math.floor( Math.random() * (anchuraTablero - anchuraBola) )
    bola.style.left = nuevoLeft + "px"
}

function actualizaTiempo(){
    console.log(tiempo.textContent)
    //mostrar que el tiempo restante ha bajado un segundo
    tiempo.textContent = tiempo.textContent - 1

    //si el tiempo se ha agotado, parar el juego (parar el tiempo y parar el clic)
    if (tiempo.textContent == 0) {
        clearInterval(reloj)
        clearInterval(alarma)
        bola.removeEventListener("click",clicSobreBola)
    }
}