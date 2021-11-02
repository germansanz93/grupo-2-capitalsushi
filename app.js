//modulos de terceros
const express = require('express');
const path = require('path');

//modulos propios
const mainController = require('./controllers/mainController');

//configs
const app = express();
const PORT = 5000;
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rutas

//home
app.get('/', mainController.index)

//contacto
app.get('/contacto', mainController.contacto)

//menu
app.get('/menu', mainController.menu)

//carrito
app.get('/carrito', mainController.carrito)

//mi_cuenta
app.get('/mi_cuenta', mainController.miCuenta)

//registro
app.get('/registrarse', mainController.registrarse)

//formularioProducto
app.get('/formulario_producto', mainController.formularioProducto)

//server escuchando
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})