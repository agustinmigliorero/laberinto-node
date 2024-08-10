const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/crear-laberinto", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "crear-laberinto.html"));
});

app.post("/crear-laberinto", (req, res) => {
  // recibe el laberinto en formato JSON y crea un nuevo archivo
  let cantidadNiveles = 0;

  fs.readdirSync("./laberintos").forEach((archivo) => {
    cantidadNiveles++;
  });

  let laberinto = req.body;
  let laberintoJSON = JSON.stringify(laberinto);
  fs.writeFileSync(`./laberintos/${cantidadNiveles + 1}.json`, laberintoJSON);
  res.send("<h1>Laberinto creado correctamente!</h1>");
});

app.get("/ver-laberintos", (req, res) => {
  //retorna en formato JSON la lectura de niveles
  let contenidoArchivos = [];

  //leer archivos de la carpeta "laberintos"

  fs.readdirSync("./laberintos").forEach((archivo) => {
    let laberinto = fs.readFileSync(`./laberintos/${archivo}`, "utf8");

    contenidoArchivos.push(laberinto);
  });

  res.json(contenidoArchivos);
});

app.get("/", (req, res) => {
  res.send("<h1>Hola!</h1>");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
