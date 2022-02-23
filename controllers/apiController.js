
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
  },
  getCategories: (req, res) => {
    db.Category.findAll().then((cats) => res.json(cats));
  },
  getUsers: (req, res) => {
    db.User.findAll().then((usr) => res.json(usr));
  }
}

module.exports = apiController;

