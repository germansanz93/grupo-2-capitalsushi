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

//server escuchando
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})