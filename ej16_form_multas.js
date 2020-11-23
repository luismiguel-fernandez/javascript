//Constantes y variables globales que no accedan al DOM


document.addEventListener("DOMContentLoaded", main)

function main() {
    const form1 = document.querySelector("form")
    form1.addEventListener("submit",function(e){
        //impedir que el formulario se envíe al pulsar INTRO o 
		// clicar en un boton SUBMIT dentro del FORM
        e.preventDefault()
        //comprobar campos
        let todoOK = true
        if ( !campoNombreOK() ) {
            todoOK = false
            const nombreError = document.querySelector("#conductorError")
            nombreError.textContent = "No ha escrito un nombre válido"
        }
        //if ( !campoDniOK() ) todoOK = false
        if ( !campoEdadOK() ) {
            todoOK = false
            const edadError = document.querySelector("#edadError")
            edadError.textContent = "No ha escrito una edad válida"
        }
        if ( !campoTipoCarneOK() ) {
            todoOK = false
            const tipoCarneError = document.querySelector("#tipoCarneError")
            tipoCarneError.textContent = "No ha seleccionado un tipo de carné"
        }
        if ( !campoTipoInfraccionOK() ) {
            todoOK = false
            const tipoInfraccionError = document.querySelector("#tipoInfraccionError")
            tipoInfraccionError.textContent = "No ha seleccionado un tipo de infracción"
        }

        //si todos los campos están OK entonces forzamos el envío
        if (todoOK) {
            form1.submit()
        }
	})
}

function campoNombreOK() {
    const nombre = document.querySelector("#conductor").value
    if (nombre.trim().length > 0)
        return true
    else
        return false
}

function campoDniOK() {

}

function campoEdadOK() {
    const edad = document.querySelector("#edad").value
    if (isNaN(edad) || edad <= 0) return false
    return true
}

function campoTipoCarneOK() {
    const radios = document.querySelectorAll("input[name=tc]")
    let tipoCarneOK = false
    radios.forEach(element => {
        if (element.checked) tipoCarneOK = true
    })
    return tipoCarneOK
}

function campoTipoInfraccionOK() {
    const tipoInfraccion = document.querySelector("#tipo")
    /*if (tipoInfraccion.value.length == 0)
        return false
    return true*/
    return (tipoInfraccion.value.length ? true : false)
}
