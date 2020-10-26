const MIN = 1
const MAX = 100
let intentosCortos = []
let intentosLargos = []

//1. generar un número aleatorio entre 1 y 100
let secreto = Math.floor(Math.random() * MAX) + 1

document.addEventListener("DOMContentLoaded",function(){
	//2. capturar teclado en INPUT (tecla INTRO)
	const userInput = document.querySelector("#userInput")
	userInput.addEventListener("keyup",function(e){
		if (e && e.key == "Enter") {
			let userTry = userInput.value.trim()
			console.log(userTry)
			if (userTry.length && !isNaN(userTry)) {
				//el texto es un número válido
				userTry = Math.floor(userTry)
				if (userTry >= MIN && userTry <= MAX)
					insertTry(userTry)
			}
		}
	})
})

function insertTry(userTry) {
	const gameLog = document.querySelector("#log")
	// comparar el intento del usuario con el secreto
	if (userTry == secreto) {
		// si acierta, sustituimos el gráfico de la ? por el número
		const secretBox = document.querySelector(".secreto")
		secretBox.classList.replace("secreto","ladrilloDescubierto")
		secretBox.textContent = secreto 
		gameLog.innerHTML += "Has acertado. "
	} else {
		// si falla, sustituimos un gráfico de LADRILLO por el número
		if (userTry < secreto) {
			gameLog.innerHTML += "<p>Te has quedado corto.</p>"
			intentosCortos.push(userTry)
			let posLadrDescubrir = 6 - intentosCortos.length
			//localizar el ladrillo adecuado y descubrirlo
			const ladrIzq = document.querySelectorAll("[name='divIntentoIzq']")
			const ladr = ladrIzq[posLadrDescubrir]
			ladr.classList.replace("ladrillo","ladrilloDescubierto")
			ladr.textContent = userTry
		} else {
			gameLog.innerHTML += "<p>Te has pasado.</p>"
		}
	}
}












