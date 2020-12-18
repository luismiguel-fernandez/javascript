//const params = new URLSearchParams("modo=1&tiempo=35&nick=Luismi")
const params = new URLSearchParams("modo=1&length=3")

const opciones = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'same-origin', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'omit', // include, *same-origin, omit
    /* headers: {
         'Content-Type': 'application/json'
         // 'Content-Type': 'application/x-www-form-urlencoded',
     },*/
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: params // body data type must match "Content-Type" header
}
/*fetch('buscaminas.php', opciones)
    .then(response => response.json())
    .then(data => console.log(data))*/

var url = 'loadRecords.php';

fetch(url, opciones)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        } else {
            throw "Error en la llamada Ajax";
        }
    })
    .then(function (json) {
        json.forEach((element, index) => {
            console.log("Index = " + index)
            console.log(` Element = [${element.nick},${element.tiempo}]`)
        })
    })
    .catch(function (err) {
        console.log("ERROR:" + err);
    });

/*
let xhr = new XMLHttpRequest()
xhr.addEventListener("readystatechange", function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log("responseText:" + this.responseText)
        let data = JSON.stringify(this.responseText)
        console.log("data:" + data)
    }
})
xhr.open("post", "buscaminas.php")
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(params)
*/