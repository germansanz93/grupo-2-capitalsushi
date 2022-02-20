//modulos de terceros
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
let db = require("../database/models");

const productsFilePath = path.join(__dirname, '../data/ProductsCapitalSushi.json');

//rutas
const orderController = {
  createOrder: (req, res) => {
    const {order} = req.body
    console.log(req)
    console.log(order);
    res.status(200).send();
  }
}

module.exports = orderController;