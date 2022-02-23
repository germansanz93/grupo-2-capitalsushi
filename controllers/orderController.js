//modulos de terceros
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
require('dotenv').config();
let db = require("../database/models");
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

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
        if (!productQty) {
          return null
        }
        const id = Object.keys(productQty)[0]
        const qty = Object.values(productQty)[0]
        db.Product.findOne({
          where: { id }
        }).then(function (product) {
          productsResponse.push({ ...product.dataValues, qty })
          if (productsToAdd.length <= productsResponse.length) {
            resolve(productsResponse);
          }
        })
      })
    })
    productsPromise.then(productsResponse => {
      res.send(JSON.stringify(productsResponse))
    })
  },
  mp: (req, res) => {

    // Crea un objeto de preferencia
    let preference = {
      items: [],
      back_urls: {
        "success": "http://localhost:8080/feedback",
        "failure": "http://localhost:8080/feedback",
        "pending": "http://localhost:8080/feedback"
      },
      auto_return: "approved",
    };

    const { order } = req.body;
    const productsToAdd = JSON.parse(order);
    const productsPromise = new Promise((resolve, reject) => {
      const productsResponse = []
      productsToAdd.forEach(function (productQty) {
        if (!productQty) {
          return null
        }
        const id = Object.keys(productQty)[0]
        const qty = Object.values(productQty)[0]
        db.Product.findOne({
          where: { id }
        }).then(function (product) {
          productsResponse.push({ id: id, title: product.title, unit_price: product.price, quantity: qty })
          if (productsToAdd.length <= productsResponse.length) {
            resolve(productsResponse);
          }
        })
      })
    })
    productsPromise.then(productsResponse => {
      preference.items = productsResponse;
      console.log(preference)
      mercadopago.preferences.create(preference)
        .then(function (response) {
          console.log('ok')
          console.log(response)
          res.json({
            id: response.body.id
          });
        }).catch(function (error) {
          console.log(error);
        });

    })
  }
}

module.exports = orderController;