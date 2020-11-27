//Constantes y variables globales que no accedan al DOM


document.addEventListener("DOMContentLoaded", main)

function main() {
    const form1 = document.querySelector("form")
    form1.addEventListener("submit",function(e){

        //impedir que el formulario se envíe al pulsar INTRO o 
		// clicar en un boton SUBMIT dentro del FORM
        e.preventDefault()

        //borrar posibles mensajes de error (LABEL) de envíos anterios
        const nombreError = document.querySelector("#conductorError")
        const dniError = document.querySelector("#dniError")
        const edadError = document.querySelector("#edadError")
        const tipoCarneError = document.querySelector("#tipoCarneError")
        const tipoInfraccionError = document.querySelector("#tipoInfraccionError")
        nombreError.textContent = ""
        edadError.textContent = ""
        tipoCarneError.textContent = ""
        tipoInfraccionError.textContent = ""

        //comprobar campos
        let todoOK = true
        if ( !campoNombreOK() ) {
            todoOK = false
            nombreError.textContent = "No ha escrito un nombre válido"
        }
        switch ( campoDniOK() ) {
            case 1:
                //no hay que sacar ningún mensaje
                dniError.textContent = ""
                break 
            case 2:
                dniError.textContent = "El DNI introducido no cumple el patrón"
                todoOK = false
                break
            case 3:
                dniError.textContent = "La letra introducida no corresponde con el número"
                todoOK = false
                break
        }
        if ( !campoEdadOK() ) {
            todoOK = false
            edadError.textContent = "No ha escrito una edad válida"
        }
        if ( !campoTipoCarneOK() ) {
            todoOK = false
            tipoCarneError.textContent = "No ha seleccionado un tipo de carné"
        }
        if ( !campoTipoInfraccionOK() ) {
            todoOK = false
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
    //DEVOLVERÁ: 1 si todo OK
    //           2 si lo que ha fallado es el patrón
    //           3 si lo que ha fallado es la letra del DNI

    //comprobar DNI haciendo uso de expresiones regulares y la función test
    const dni = document.querySelector("#dni").value
    // que empieze por 8 dígitos decimales y acaba en una letra
    // y opcionalmente podríamos aceptar guión medio
    const patronDni = /^\d{8}[a-zA-Z]$/
    //comprobación con función "test"
    if (patronDni.test(dni)) {
        //el dni que ha escrito el usuario cumple el patrón
        //falta comprobar si la letra es la correcta para ese número
        //Se separan los números de la letra
        let letraDNI = dni.substring(8, 9).toUpperCase();
        let numDNI = parseInt(dni.substring(0, 8));
        //Se calcula la letra correspondiente al número
        const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        let letraCorrecta = letras[numDNI % 23];
        if (letraDNI != letraCorrecta)
            return 3
        else
            return 1
    } else {
        //el dni que ha escrito el usuario NO cumple el patrón
        return 2
    }
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
