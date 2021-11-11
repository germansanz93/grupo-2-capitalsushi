//modulos de terceros
const path = require('path');


//rutas

const mainController ={

  index : (req, res) => {
    res.render(path.join(__dirname, '../views/home.ejs'));
  },
  contacto : (req, res) => {
    res.render(path.join(__dirname, '../views/contacto.ejs'));
  },
  menu: (req,res) => {
    res.render(path.join(__dirname,'../views/menu.ejs'));
  },
  carrito: (req, res) => {
    res.render(path.join(__dirname, '../views/carrito.ejs'));
  },
  miCuenta: (req, res) => {
    res.render(path.join(__dirname, '../views/mi_cuenta.ejs'));
  },
  registrarse: (req, res) => {
    res.render(path.join(__dirname, '../views/registrarse.ejs'));
  },
  formularioProducto: (req,res) => {
<<<<<<< HEAD
    res.render(path.join(__dirname, '../views/formularioProducto.ejs'))
  },
  cartilla: (req,res) => {
    res.render(path.join(__dirname, '../views/cartilla.ejs'))
=======
    res.render(path.join(__dirname, '../views/formulario_producto.ejs'))
>>>>>>> f525688e6e5a3a00304c56f080417e56e09aba50
  }
}

module.exports = mainController;