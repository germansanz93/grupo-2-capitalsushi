//modulos de terceros
const express = require('express');
const path = require('path');

//modulos propios

//configs
const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

//rutas

//home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
})

//contacto
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/contacto.html'));
})

//menu
app.get('/menu', (req,res) => {
  res.sendFile(path.join(__dirname,'/views/menu.html'));
})

//carrito
app.get('/carrito', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/carrito.html'));
})

//mi_cuenta
app.get('/mi_cuenta', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/mi_cuenta.html'));
})

//server escuchando
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})