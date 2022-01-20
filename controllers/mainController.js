//modulos de terceros
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
let db = require("../database/models/Product");

const productsFilePath = path.join(__dirname, '../data/ProductsCapitalSushi.json');

//rutas
const mainController = {

  index: (req, res) => {
    res.render(path.join(__dirname, '../views/home.ejs'));
  },
  contact: (req, res) => {
    res.render(path.join(__dirname, '../views/contacto.ejs'));
  },
  menu: (req, res) => {
    res.render(path.join(__dirname, '../views/menu.ejs'));
  },
  cart: (req, res) => {
    res.render(path.join(__dirname, '../views/carrito.ejs'));
  },
  productForm: (req, res) => {
    res.render(path.join(__dirname, '../views/formularioProducto.ejs'))
  },
  chart: (req, res) => {
    res.render(path.join(__dirname, '../views/cartilla.ejs'))
  },
  createProduct: (req, res) => {
    db.createProduct({
      id: req.body.id,
      title: req.body.title,
      category_id: req.body.category_id,
      prod_description: req.body.prod_description,
      picture: req.body.picture,
      price: req.body.price,
    })
    .then (product => {
      res.redirect("/product")
    })
  },
  showProduct: (req, res) => {
    const {id} = req.params;
    const product = JSON.parse(readFileSync(productsFilePath)).filter(product => product.id == id)[0];
    console.log(product)
    res.render('../views/detalleProducto.ejs', {product});
  },
  editarProducto: (req, res) => {
    db.Product.update({
             nombre: req.body.nombreEditado,
             precio: req.body.precioEditado,
             descripcion: req.body.descripcionEditada
           },
          {
             where: { id: req.params.id }
          }
       )
       .then(() => {
          res.redirect('/product');
       })
      },
  deleteProduct: (req, res) => {
    db.Product.destroy({
      where:{id:req.params.id}
    })
    res.redirect("/product")},
  }

module.exports = mainController;