//modulos de terceros
const path = require('path');


//rutas

const mainController ={

  index : (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
  },
  contact : (req, res) => {
    res.sendFile(path.join(__dirname, '/views/contacto.html'));
  },
  menu: (req,res) => {
    res.sendFile(path.join(__dirname,'./views/menu.html'));
  },
  carrito: (req, res) => {
    res.sendFile(path.join(__dirname, './views/carrito.html'));
  },
  miCuenta: (req, res) => {
    res.sendFile(path.join(__dirname, './views/mi_cuenta.html'));
  },
  registrarse: (req, res) => {
    res.sendFile(path.join(__dirname, './views/registrarse.html'));
  }
}

module.exports = mainController;