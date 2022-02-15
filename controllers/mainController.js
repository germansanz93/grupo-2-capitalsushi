//modulos de terceros
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
let db = require("../database/models");

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
  chart: (req, res) => {
    const productsPromise = db.Product.findAll({
      include: [
        { association: "category" }
      ]
    })
    const categoriesPromise = db.Category.findAll({})
    Promise.all([productsPromise, categoriesPromise]).then((values) => {
      const products = values[0]
      const categories = values[1]
      res.render(path.join(__dirname, '../views/cartilla.ejs'), {products, categories});
    })
  },
  notfound: (req,res) => {
    res.render(path.join(__dirname, '../views/404.ejs'));
  }
}

module.exports = mainController;