//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EJERCICIO 2 DEL EXAMEN
(function() {
    //todo tu codigo js aqui

    let todosLosTD
    let actual
    let reloj

	document.addEventListener("DOMContentLoaded", function(){

        let cuerpo = document.querySelector("#segundos tbody")
        for (let i=0; i<60; i++) {
            let nuevoTD = document.createElement("TD")
            cuerpo.append(nuevoTD)
        }

        todosLosTD = document.querySelectorAll("#segundos tbody td")
        actual = 0

        const empezar = document.querySelector("#empezar")
        const parar = document.querySelector("#parar")
        empezar.addEventListener("click", function(){
            reloj = setInterval(colorearTD,1000)
            this.disabled = true
            parar.disabled = false
        })
        parar.addEventListener("click", function(){
            clearInterval(reloj)
            this.disabled = true
            empezar.disabled = false
        })

        empezar.setAttribute("enabled",true)
        parar.setAttribute("disabled",true)
    })

    function colorearTD() {
        todosLosTD[actual].classList.toggle("coloreado")
        actual = ++actual % 60   
    }

})();





