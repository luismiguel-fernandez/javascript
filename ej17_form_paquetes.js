//NOMBRE DEL ALUMNO: Luismi 

//RESOLUCIÓN DEL EXAMEN

document.addEventListener("DOMContentLoaded",main)

function main() {
    const formu = document.querySelector("#formEnvios")
    formu.action = "ej17_formOK.html"
    formu.addEventListener("submit", function(ev){
        ev.preventDefault()
        if (checkTodo())
            this.submit()
    })

    const btnAnyadir = document.querySelector("#anyadir")
    btnAnyadir.addEventListener("click",function(){
        if (checkTodo())
            anyadirPedidoTabla()
    })
}//acaba MAIN

function checkTodo() {
    //borrado de posibles mensajes de error
    //lo ideal es recuperar todos los LABEL a la vez, en un bucle recorrerlos y establecer textContent a ""
    document.querySelector("#refPedidoError").textContent = ""
    document.querySelector("#pesoError").textContent = ""

    let todoOK = true
    //comprobar el primer INPUT
    if (!checkNumRef()) {
        todoOK = false
        const numRefError = document.querySelector("#refPedidoError")
        numRefError.textContent = "El número de referencia no cumple el patrón exigido"
    }
    //comprobar el segundo INPUT
    if (!checkPeso()) {
        todoOK = false
        const pesoError = document.querySelector("#pesoError")
        pesoError.textContent = "El peso introducido no sigue el patrón exigido"
    }
    return todoOK
}

function checkNumRef(){
    const inputNumRef = document.querySelector("#refPedido")
    let numRef = inputNumRef.value.trim()
    const expReg = /^[A-E]\d{5}$/ 
    //const expReg = /^[ABCDE][0-9]{5}$/
    return expReg.test(numRef)
}

function checkPeso(){
    const inputPeso = document.querySelector("#peso")
    let peso = inputPeso.value.trim()
    if (peso == "0.0" || peso == "00.0") return false
    const expReg = /^\d{1,2}[.]\d$/
    return expReg.test(peso)
}

function anyadirPedidoTabla(){
    const inputNumRef = document.querySelector("#refPedido")
    let numRef = inputNumRef.value.trim()
    const inputPeso = document.querySelector("#peso")
    let peso = inputPeso.value.trim()
    const cuerpo = document.querySelector("#tablaEnvios>tbody")

    let nuevoTR = document.createElement("TR")
    let nuevoTD1 = document.createElement("TD")
    nuevoTD1.textContent = numRef
    let nuevoTD2 = document.createElement("TD")
    nuevoTD2.textContent = peso
    let nuevoTD3 = document.createElement("TD")
    let nuevoBoton = document.createElement("BUTTON")
    nuevoBoton.textContent = "Borrar pedido"
    nuevoBoton.addEventListener("click", (ev) => {
        //nuevoTR.remove()
/*
        <tbody>
            <tr>
                <td>
                    <button>
*/
        //this.parentElement.parentElement.remove()
        ev.target.parentElement.parentElement.remove()
    })
    nuevoTD3.append(nuevoBoton)
    nuevoTR.append(nuevoTD1,nuevoTD2,nuevoTD3)

    cuerpo.append(nuevoTR)
}