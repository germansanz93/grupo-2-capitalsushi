//modulos de terceros
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/ProductsCapitalSushi.json');

//rutas
const mainController = {

  index: (req, res) => {
    res.render(path.join(__dirname, '../views/home.ejs'));
  },
  contacto: (req, res) => {
    res.render(path.join(__dirname, '../views/contacto.ejs'));
  },
  menu: (req, res) => {
    res.render(path.join(__dirname, '../views/menu.ejs'));
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
  formularioProducto: (req, res) => {
    res.render(path.join(__dirname, '../views/formularioProducto.ejs'))
  },
  cartilla: (req, res) => {
    res.render(path.join(__dirname, '../views/cartilla.ejs'))
  },
  crearProducto: (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render('../views/formularioProducto.ejs',{ 
        errors: result.mapped(),
        oldData: req.body  
      })
    }
    const { title, price, description } = req.body;
    const id = uuidv4();
    const { filename } = req.file;
    const product = { id, title, description, filename, price }
    const stored = JSON.parse(readFileSync(productsFilePath))
    stored.push(product);
    writeFileSync(productsFilePath, JSON.stringify(stored, null, 2))
    res.redirect('/menu');
  },
  mostrarProducto: (req, res) => {
    const {id} = req.params;
    const product = JSON.parse(readFileSync(productsFilePath)).filter(product => product.id == id)[0];
    console.log(product)
    res.render('../views/detalleProducto.ejs', {product});
  },
  borrarProducto: (req, res) => {
    const {id} = req.params;
    let stored = JSON.parse(readFileSync(productsFilePath))
    stored = stored.filter(product => product.id != id);
    writeFileSync(productsFilePath, JSON.stringify(stored, null, 2))
    res.render('/views/cartilla');
  }
}

module.exports = mainController;