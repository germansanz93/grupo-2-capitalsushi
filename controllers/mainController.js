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
  }
}

module.exports = mainController;