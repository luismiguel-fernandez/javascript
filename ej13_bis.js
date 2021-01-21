window.onload = function() {
	var anchoTablero = 800;
	var altoTablero = 450;
	var anchoBola = 30;
	var altoBola = 30;
	
	var tablero = document.getElementById("tablero");
	tablero.style.width = anchoTablero + "px";
	tablero.style.height = altoTablero + "px";
	
	var bola = document.getElementById("bola");
	bola.style.width = anchoBola + "px";
	bola.style.height = altoBola + "px";

	var btnEmpezar = document.getElementById("btnEmpezar");
	btnEmpezar.onclick = function() {
		//reseteamos marcador
		var marcador = document.getElementById("puntos");
		marcador.innerHTML = 0;
		//reiniciamos el cronnómetro
		var tiempo = document.getElementById("tiempo");
		tiempo.innerHTML = 5;
		//colocamos bola random
		bola.style.left = Math.random() * (anchoTablero - anchoBola);
		bola.style.top = Math.random() * (altoTablero - altoBola);
		//ponemos en marcha los intervals necesarios
		intervaloBola = setInterval(colocarBolaRnd, 1500, bola, anchoTablero, altoTablero, anchoBola, altoBola);
		intervaloTiempo = setInterval(decrementarTiempo, 1000);		
		//hacemos clicable la bola
		bola.onclick = function() {
			marcador.innerHTML++;
			colocarBolaRnd(bola, anchoTablero, altoTablero, anchoBola, altoBola);
			clearInterval(intervaloBola);
			intervaloBola = setInterval(colocarBolaRnd, 1500 - marcador.innerHTML * 100, bola, anchoTablero, altoTablero, anchoBola, altoBola);
		}
	}
	

}

function colocarBolaRnd(bola, anchoTablero, altoTablero, anchoBola, altoBola) {
	bola.style.left = Math.random() * (anchoTablero - anchoBola);
	bola.style.top = Math.random() * (altoTablero - altoBola);
}

function decrementarTiempo() {
	var tiempo = document.getElementById("tiempo");
	if (tiempo.innerHTML > 0) {
		//restar 1 segundo
		tiempo.innerHTML--;
	} else {
		//terminar la partida
		clearInterval(intervaloBola);
		clearInterval(intervaloTiempo);
		var bola = document.getElementById("bola");
		bola.onclick = null;
	}
	
}
















