document.addEventListener("DOMContentLoaded",main)

function main() {
    // Crear un objeto para la comunicación asíncrona con el servidor
    let xhr = new XMLHttpRequest()

    // Definir la función que se va a encargar de vigilar los cambios de estado 
    // del propio objeto xhr
    xhr.addEventListener("readystatechange", function() {
        //console.log("Me encuentro en el estado " + this.readyState)
        // Preguntar a qué estado acaba de cambiar el objeto xhr
        if (this.readyState == 4 && this.status == 200) {
            // Todo ha ido bien, debo procesar la respuesta del servidor
            //alert(this.responseText)
            //Recorrer el XML en busca de la información crítica
            let nombresProvincias = Array.from(this.responseXML.getElementsByTagName("provincia"))
            const selectProvincias = document.querySelector("#provincia")
            //Añadir un primer OPTION como elemento predeterminado del SELECT
            selectProvincias.innerHTML = "<option>(Listado de provincias)</option>"
            //Añadir el resto de OPTION (las provincias)
            nombresProvincias.forEach(element => {
                let codigo = element.firstElementChild.textContent
                let nombre = element.lastElementChild.textContent
                let nuevoOption = document.createElement("OPTION")
                nuevoOption.textContent = nombre
                nuevoOption.value = codigo
                selectProvincias.append(nuevoOption)
            })

            //Por último, queremos capturar los cambios que el usuario haga
            // en este SELECT de provincias
            selectProvincias.addEventListener("change",function(){
                //this.selectedIndex //número de OPTION que está seleccionado
                console.log(this.children[this.selectedIndex].textContent)
                //añadir un if por si el usuario elige un OPTION sin value
                // if ()
                cargaMunicipios(this.value)
            })
        }
    })

    // Define la forma de acceso y el recurso al que accederemos
    // Adicionalmente, ponemos true para indicar que la comunicación sea Asíncrona
    xhr.open("get","cargaProvinciasXML.php")

    // Lanzamos la consulta
    xhr.send()
}

function cargaMunicipios(codProvincia) {
    //llamar al segundo PHP y pasarle codProvincia como parámetro "provincia"

    //Iniciar una segunda llamada AJAX, esta vez pasando un parámetro
    // con el código de la provincia seleccinada por el usuario
    let xhr2 = new XMLHttpRequest()
    xhr2.addEventListener("readystatechange",function(){
        if (this.readyState == 4 && this.status == 200) {
            //procesar la respuesta del servidor: XML --> OPTIONs del 2º SELECT
            let nombresMunicipios = Array.from(this.responseXML.getElementsByTagName("municipio"))
            const selectMunicipios = document.querySelector("#municipio")
            selectMunicipios.innerHTML = "<option>(Listado de municipios)</option>"
            nombresMunicipios.forEach(element => {
                let codMunicipio = element.firstElementChild.textContent
                let nomMunicipio = element.lastElementChild.textContent
                let nuevoOption = document.createElement("OPTION")
                nuevoOption.textContent = nomMunicipio
                nuevoOption.value = codMunicipio
                selectMunicipios.append(nuevoOption)
            })
        }
    })
    xhr2.open("post","cargaMunicipiosXML.php")
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send("provincia="+codProvincia)

}