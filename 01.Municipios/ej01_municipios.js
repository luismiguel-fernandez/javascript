document.addEventListener("DOMContentLoaded",main)

function main() {
    // Crear un objeto para la comunicación asíncrona con el servidor
    let xhr = new XMLHttpRequest()

    // Definir la función que se va a encargar de vigilar los cambios de estado 
    // del propio objeto xhr
    xhr.addEventListener("readystatechange", function() {
        console.log("Me encuentro en el estado " + this.readyState)
        // Preguntar a qué estado acaba de cambiar el objeto xhr
        if (this.readyState == 4 && this.status == 200) {
            // Todo ha ido bien, debo procesar la respuesta del servidor
            const selectProvincias = document.querySelector("#provincia")
            procesarXMLprovincias(this.responseXML, selectProvincias)
        }
    })

    // Define la forma de acceso y el recurso al que accederemos
    // Adicionalmente, ponemos true para indicar que la comunicación sea Asíncrona
    xhr.open("get","cargaProvinciasXML.php",true)

    // Lanzamos la consulta
    xhr.send()
}

function procesarXMLprovincias(xml,contenedor) {
    //Vaciar el SELECT por si tiene resultados de búsquedas anteriores y añadir un elemento cabecera
    contenedor.innerHTML = "<option>(Listado de provincias)</option>"
    //Recorrer el XML en busca de la información crítica: Añadir todas las provincias al SELECT
    let nombresProvincias = Array.from(xml.getElementsByTagName("provincia"))
    nombresProvincias.forEach(element => {
        contenedor.innerHTML += `<option value="${element.firstElementChild.textContent}">${element.lastElementChild.textContent}</option>`
    })
    //Detectar cambios en la elección de provincia
    contenedor.addEventListener("change", function(){
        //Nueva consulta AJAX, esta vez para pedir la lista de municipios de una provincia concreta
        let xhr2 = new XMLHttpRequest()
        xhr2.addEventListener("readystatechange", function() {
            if (this.readyState == 4 && this.status == 200) {
                const selectMunicipios = document.querySelector("#municipio")
                procesarXMLmunicipios(this.responseXML,selectMunicipios)
            }
        })
        xhr2.open("post","cargaMunicipiosXML.php",true)
        xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr2.send("provincia="+this.value)
    })
}

function procesarXMLmunicipios(xml,contenedor) {
    //Vaciar el SELECT por si tiene resultados de búsquedas anteriores y añadir un elemento cabecera
    contenedor.innerHTML = "<option>(Listado de municipios)</option>"
    //Recorrer el XML en busca de la información crítica: Añadir todas los municipios al SELECT
    let nombresMunicipios = Array.from(xml.getElementsByTagName("municipio"))
    nombresMunicipios.forEach(element => {
        contenedor.innerHTML += `<option value="${element.firstElementChild.textContent}">${element.lastElementChild.textContent}</option>`
    })
}