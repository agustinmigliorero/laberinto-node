const divLaberinto = document.getElementById("div-laberinto");
const btnGenerar = document.getElementById("btn-generar");
const inputFilas = document.getElementById("input-filas");
const inputColumnas = document.getElementById("input-columnas");
let celdas;

let mapaLaberinto;

function generarMapa(filas, columnas) {
  let laberinto = [];

  for (let i = 0; i < filas; i++) {
    laberinto.push([]);
    for (let j = 0; j < columnas; j++) {
      laberinto[i].push(0);
    }
  }

  return laberinto;
}

function dibujarLaberinto() {
  btnGuardar.style.display = "inline";
  divLaberinto.innerHTML = "";
  for (let i = 0; i < mapaLaberinto.length; i++) {
    let filaLaberinto = document.createElement("div");
    filaLaberinto.classList.add("fila-laberinto");
    for (let j = 0; j < mapaLaberinto[i].length; j++) {
      let div = document.createElement("img");
      div.classList.add("celda");
      div.id = i + "," + j;
      if (mapaLaberinto[i][j] == 1) {
        div.classList.add("pared");
        div.src = "../assets/pared.png";
      } else if (mapaLaberinto[i][j] == 2) {
        div.classList.add("jugador");
        div.src = "../assets/jugador.png";
      } else if (mapaLaberinto[i][j] == 3) {
        div.classList.add("salida");
        div.src = "../assets/salida.png";
      } else if (mapaLaberinto[i][j] == 0) {
        div.classList.add("camino");
        div.src = "../assets/camino.png";
      }
      divLaberinto.appendChild(filaLaberinto);
      filaLaberinto.appendChild(div);
    }
    celdas = document.querySelectorAll(".celda");
  }

  eventosCeldas();
}

btnGenerar.addEventListener("click", () => {
  let filas = Number(inputFilas.value);
  let columnas = Number(inputColumnas.value);
  if (filas > 0 && columnas > 0) {
    mapaLaberinto = generarMapa(filas, columnas);
    dibujarLaberinto();
  }
});

function eventosCeldas() {
  celdas.forEach((celda) => {
    celda.addEventListener("click", () => {
      let coordenadas = celda.id.split(",");
      let fila = Number(coordenadas[0]);
      let columna = Number(coordenadas[1]);
      if (mapaLaberinto[fila][columna] == 0) {
        mapaLaberinto[fila][columna] = 1;
      } else if (mapaLaberinto[fila][columna] == 1) {
        mapaLaberinto[fila][columna] = 2;
      } else if (mapaLaberinto[fila][columna] == 2) {
        mapaLaberinto[fila][columna] = 3;
      } else if (mapaLaberinto[fila][columna] == 3) {
        mapaLaberinto[fila][columna] = 0;
      }
      dibujarLaberinto();
    });
  });
}

const btnGuardar = document.getElementById("btn-guardar");
btnGuardar.addEventListener("click", () => {
  if (mapaLaberinto == undefined) {
    console.log("No hay laberinto");
  } else {
    fetch("http://localhost:3000/crear-laberinto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mapaLaberinto),
    })
      .then((data) => {
        divLaberinto.innerHTML = "";
        mapaLaberinto = undefined;
        btnGuardar.style.display = "none";
        inputColumnas.value = "";
        inputFilas.value = "";
        alert("Laberinto guardado!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

let hola = "U+16000 + 1000";
