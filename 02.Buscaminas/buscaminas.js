// Esto no lo vamos a poner (no es necesario)
// porque hemos puesto el atributo DEFER en SCRIPT de HTML
/*document.addEventListener("DOMContentLoaded",main);

function main() {

}*/

//Generar 121 celdas en disposición 11x11
const tablero = document.querySelector("#tablero");
const inputFila = document.querySelector("#inputFila");
const inputColumna = document.querySelector("#inputColumna");

for (let i=0; i<121; i++) {
    let nuevaCelda = document.createElement("DIV");
    nuevaCelda.classList.add("celda");
    
    nuevaCelda.dataset.fila = Math.floor(i/11);
    nuevaCelda.dataset.columna = i%11;
    nuevaCelda.dataset.clicado = false;
    nuevaCelda.dataset.mina = false;

    nuevaCelda.addEventListener("mouseover", (ev) => {
        inputFila.value = ev.target.dataset.fila;
        inputColumna.value = ev.target.dataset.columna;
        inputMina.value = ev.target.dataset.mina;
    })

    nuevaCelda.addEventListener("click", (ev) => {
        
        if (ev.target.dataset.clicado === "false") {
            ev.target.dataset.clicado = true;
            if (ev.target.dataset.mina === "true") {
                ev.target.classList.add("mina_explotada");
                //terminar la partida perdiendo
                //1 desvelar todo el tablero
                //2 anular el clic para que el usuario no pueda seguir jugando
                const todasLasCeldas = Array.from(document.querySelectorAll(".celda"))
                todasLasCeldas.forEach(element => {
                    element.dataset.clicado = true;
                })
            } else {
                ev.target.classList.add("celda_clicada");
            }
        }
    })

    tablero.append(nuevaCelda);
}

//Establecer las minas aleatoriamente
let minasPorColocar = 100
const todasLasCeldas = document.querySelectorAll(".celda")
while (minasPorColocar > 0) {
    let aleatorio = Math.floor(Math.random()*120)
    if (todasLasCeldas[aleatorio].dataset.mina === "false") {
        //colocar mina y decrementar contador
        todasLasCeldas[aleatorio].dataset.mina = true
        minasPorColocar--
    } 
}
