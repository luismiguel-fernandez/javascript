document.addEventListener("DOMContentLoaded",function(){
    const txtAdd = document.querySelector("#txtAdd")
    const mylist = document.querySelector("#mylist")
    const btnAdd = document.querySelector("#btnAdd")

    //0. dar el foco al INPUT text
    txtAdd.focus()

    //1. tecleo en el INPUT text
    txtAdd.addEventListener("keyup",function(e){
        if (e && e.key == "Enter") {
            addItemToList(txtAdd,mylist)
        }
    })
    //2. cliqueo del INPUT button añadir
    btnAdd.addEventListener("click",function(){
        addItemToList(txtAdd,mylist)
    })
    //3. cliqueo de las 5 acciones sobre "My shopping list"
    document.querySelector("#btnSelAll").addEventListener("click",function(){
        let todosLosLI = document.querySelectorAll("#mylist>li")
        todosLosLI.forEach(function(elemento){
            elemento.classList.add("seleccionado")
        })
    })
    document.querySelector("#btnSelNot").addEventListener("click",function(){
        let todosLosLI = document.querySelectorAll("#mylist>li")
        todosLosLI.forEach(function(elemento){
            elemento.classList.remove("seleccionado")
        })
    })
    document.querySelector("#btnInvSel").addEventListener("click",function(){
        let todosLosLI = document.querySelectorAll("#mylist>li")
        todosLosLI.forEach(function(elemento){
            elemento.classList.toggle("seleccionado")
        })
    })
    document.querySelector("#btnMovSel").addEventListener("click",function(){

    })
    document.querySelector("#btnDelSel").addEventListener("click",function(){

    })
    //4. cliqueo vaciar "My cart"
})

function addItemToList(txtAdd,mylist) {
    console.log(txtAdd.value)
    //comprobar si hay texto en la caja
    if (txtAdd.value.trim().length) {
        //crear un nuevo LI con el texto de la caja
        let nuevoLI = document.createElement("LI")
        nuevoLI.textContent = txtAdd.value.trim()
        //insertarlo en la lista "My shopping list"
        mylist.appendChild(nuevoLI)
        //hacer clicable el nuevo LI
        nuevoLI.addEventListener("click",function(){
            this.classList.toggle("seleccionado")
        })
        //vaciar caja
        txtAdd.value = ""
        //poner de nuevo el foco en la caja
        txtAdd.focus()
    }
}