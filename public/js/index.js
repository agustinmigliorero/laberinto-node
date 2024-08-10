const divLaberinto = document.getElementById("div-laberinto");

//Estados del laberinto:
//"0" = camino
//"1" = pared
//"2" = jugador
//"3" = salida

const juego = {
  nivelActual: 0,
  niveles: [],
};

async function cargarNiveles() {
  const respuesta = await fetch("http://localhost:3000/ver-laberintos");
  const nivelesFetch = await respuesta.json();

  const niveles = nivelesFetch.map((nivel) =>
    JSON.parse(nivel.replace(/"/g, ""))
  );

  juego.niveles = niveles;
  dibujarLaberinto();
}

let mapaLaberinto;

let ultimaTecla = "abajo";

function dibujarLaberinto() {
  let { niveles, nivelActual } = juego;

  if (nivelActual >= niveles.length) {
    document.body.innerHTML =
      "<h1 style='font-size: 50px; text-align: center'>TERMINASTE TODOS LOS NIVELES DISPONIBLES!</h1>";
    return;
  }
  mapaLaberinto = niveles[nivelActual];
  divLaberinto.innerHTML = "";
  for (let i = 0; i < mapaLaberinto.length; i++) {
    let filaLaberinto = document.createElement("div");
    filaLaberinto.classList.add("fila-laberinto");
    for (let j = 0; j < mapaLaberinto[i].length; j++) {
      let fondo = document.createElement("div");
      let div = document.createElement("img");
      fondo.classList.add("celda");
      if (mapaLaberinto[i][j] == 1) {
        div.classList.add("pared");
        div.src = "../assets/pared.png";
      } else if (mapaLaberinto[i][j] == 2) {
        fondo.classList.add("jugador");
        // div.classList.add("jugador");
        div.src = "../assets/jugador.png";
        if (ultimaTecla == "arriba") {
          div.style.rotate = "180deg";
        } else if (ultimaTecla == "abajo") {
          div.style.rotate = "0deg";
        } else if (ultimaTecla == "izquierda") {
          div.style.rotate = "90deg";
        } else if (ultimaTecla == "derecha") {
          div.style.rotate = "270deg";
        }
      } else if (mapaLaberinto[i][j] == 3) {
        div.classList.add("salida");
        div.src = "../assets/salida.png";
      } else if (mapaLaberinto[i][j] == 0) {
        div.classList.add("camino");
        div.src = "../assets/camino.png";
      }
      fondo.appendChild(div);
      filaLaberinto.appendChild(fondo);
    }
    divLaberinto.appendChild(filaLaberinto);
  }
}

function retornarPosicionJugador() {
  for (let i = 0; i < mapaLaberinto.length; i++) {
    for (let j = 0; j < mapaLaberinto[i].length; j++) {
      if (mapaLaberinto[i][j] == 2) {
        return [i, j];
      }
    }
  }
}

cargarNiveles();

//Funcion para mover el jugador
document.addEventListener("keydown", moverJugador);

//hacer un evento que si aprieta la tecla W hace algo

function moverJugador(evento) {
  let posicionJugador = retornarPosicionJugador();
  switch (evento.key) {
    case "w":
      ultimaTecla = "arriba";
      if (mapaLaberinto[posicionJugador[0] - 1][posicionJugador[1]] == 0) {
        mapaLaberinto[posicionJugador[0]][posicionJugador[1]] = 0;
        mapaLaberinto[posicionJugador[0] - 1][posicionJugador[1]] = 2;
        posicionJugador[0] = posicionJugador[0] - 1;
      } else if (
        mapaLaberinto[posicionJugador[0] - 1][posicionJugador[1]] == 3
      ) {
        alert("Has ganado");
        juego.nivelActual++;
        dibujarLaberinto();
      }
      break;
    case "a":
      ultimaTecla = "izquierda";
      if (mapaLaberinto[posicionJugador[0]][posicionJugador[1] - 1] == 0) {
        mapaLaberinto[posicionJugador[0]][posicionJugador[1]] = 0;
        mapaLaberinto[posicionJugador[0]][posicionJugador[1] - 1] = 2;
        posicionJugador[1] = posicionJugador[1] - 1;
      } else if (
        mapaLaberinto[posicionJugador[0]][posicionJugador[1] - 1] == 3
      ) {
        alert("Has ganado");
        juego.nivelActual++;
        dibujarLaberinto();
      }
      break;
    case "s":
      ultimaTecla = "abajo";
      if (mapaLaberinto[posicionJugador[0] + 1][posicionJugador[1]] == 0) {
        mapaLaberinto[posicionJugador[0]][posicionJugador[1]] = 0;
        mapaLaberinto[posicionJugador[0] + 1][posicionJugador[1]] = 2;
        posicionJugador[0] = posicionJugador[0] + 1;
      } else if (
        mapaLaberinto[posicionJugador[0] + 1][posicionJugador[1]] == 3
      ) {
        alert("Has ganado");
        juego.nivelActual++;
        dibujarLaberinto();
      }
      break;
    case "d":
      ultimaTecla = "derecha";
      if (mapaLaberinto[posicionJugador[0]][posicionJugador[1] + 1] == 0) {
        mapaLaberinto[posicionJugador[0]][posicionJugador[1]] = 0;
        mapaLaberinto[posicionJugador[0]][posicionJugador[1] + 1] = 2;
        posicionJugador[1] = posicionJugador[1] + 1;
      } else if (
        mapaLaberinto[posicionJugador[0]][posicionJugador[1] + 1] == 3
      ) {
        alert("Has ganado");
        juego.nivelActual++;
        dibujarLaberinto();
      }
      break;
  }

  dibujarLaberinto();
}

//funcion detectar colisiones o salida y mover el jugador
