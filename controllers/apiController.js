
const path = require('path');
const db = require("../database/models");
const fs = require('fs')

const apiController = {
  getProducts: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "category" }
      ]
    }).then(function (products) {
        console.log(products)
        res.json(products)
      })
  }
}

module.exports = apiController;

