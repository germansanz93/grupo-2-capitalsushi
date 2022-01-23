const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { calidationResult } = require('express-validator');
const db = require("../database/models/Product");

const productsFilePath = path.join(__dirname, '../data/ProductsCapitalSushi.json');

const productController = {
  createProduct: (req, res) => {
    db.createProduct({
      id: req.body.id,
      title: req.body.title,
      category_id: req.body.category_id,
      prod_description: req.body.prod_description,
      picture: req.body.picture,
      price: req.body.price,
    })
      .then(product => {
        res.redirect("/product")
      })
  },
  showProduct: (req, res) => {
    const { id } = req.params;
    const product = JSON.parse(readFileSync(productsFilePath)).filter(product => product.id == id)[0];
    console.log(product)
    res.render('../views/detalleProducto.ejs', { product });
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
      where: { id: req.params.id }
    })
    res.redirect("/product")
  },
  productForm: (req, res) => {
    res.render(path.join(__dirname, '../views/formularioProducto.ejs'))
  },
}

module.exports = productController;