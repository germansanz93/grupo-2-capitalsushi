//modulos de terceros
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
require('dotenv').config();
let db = require("../database/models");

const productsFilePath = path.join(__dirname, '../data/ProductsCapitalSushi.json');

//rutas
const orderController = {
  createOrder: (req, res) => {
    const { order } = req.body
    console.log(order)
    res.redirect("/cart");
  },
  completeOrder: (req, res) => {
    const { order } = req.body;
    const productsToAdd = JSON.parse(order);
    const productsPromise = new Promise((resolve, reject) => {
      const productsResponse = []
      productsToAdd.forEach(function (productQty) {
        if(!productQty){
          return null
        }
        const id = Object.keys(productQty)[0]
        const qty = Object.values(productQty)[0]
        db.Product.findOne({
          where: { id }
        }).then(function (product) {
          productsResponse.push({ ...product.dataValues, qty })
          if(productsToAdd.length <= productsResponse.length){
            resolve(productsResponse);
          }
        })
      })
    })
    productsPromise.then(productsResponse => {
      res.send(JSON.stringify(productsResponse))
    })
  }
}

module.exports = orderController;