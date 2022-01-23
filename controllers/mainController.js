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
  chart: (req, res) => {
    res.render(path.join(__dirname, '../views/cartilla.ejs'))
  }
}

module.exports = mainController;