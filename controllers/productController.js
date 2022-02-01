const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { calidationResult } = require('express-validator');
const db = require("../database/models");


const productController = {
  allProducts: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "category" }
      ]
    }
    )
      .then(function (products) {
        res.render('../views/allProducts.ejs', { products })
      })
  },
  createProduct: (req, res) => {
    const product = { ...req.body }
    product.picture = req.file.filename;
    product.id = uuidv4();
    db.Product.create(product)
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
  editProductForm: (req, res) => {
    const { id } = req.params;
    const productPromise = db.Product.findOne({
      where: { id }
    });
    const categoriesPromise = db.Category.findAll();
    Promise.all([productPromise, categoriesPromise]).then(function (values) {
      const product = values[0];
      const categories = values[1]
      console.log(values)
      res.render('../views/editProductForm.ejs', { product, categories })
    })
    
  },
  editProduct: (req, res) => {
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
    const { id } = req.params;
    db.Product.destroy({
      where: { id }
    })
    res.redirect("/product")
  },
  productForm: (req, res) => {
    db.Category.findAll()
      .then(function (categories) {
        console.log(categories);
        res.render(path.join(__dirname, '../views/productForm.ejs'), { categories });
      })
  },
}

module.exports = productController;