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
            //alert(this.responseText)
            //Recorrer el XML en busca de la información crítica
            let parser = new DOMParser()
            let xmlDoc = parser.parseFromString(this.responseText, "text/xml")
            let nombresProvincias = Array.from(xmlDoc.getElementsByTagName("nombre"))
            nombresProvincias.forEach(element => {
                console.log(element.textContent)
                //Añadir un hijo OPTION al primer select
                
            })
        }
    })

    // Define la forma de acceso y el recurso al que accederemos
    // Adicionalmente, ponemos true para indicar que la comunicación sea Asíncrona
    xhr.open("get","cargaProvinciasXML.php",true)

    // Lanzamos la consulta
    xhr.send()
}