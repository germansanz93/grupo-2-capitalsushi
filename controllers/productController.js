const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const db = require("../database/models");
const fs = require('fs')

const productController = {
  allProducts: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "category" }
      ]
    }).then(function (products) {
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
      res.render('../views/editProductForm.ejs', {oldData : product, categories});
    })
    
  },
  editProduct: (req, res) => {
    const product = req.body
    if(req.file && req.file.filename){
      product.picture = req.file.filename;
    }
    db.Product.update(
      product,
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
    db.Product.findOne({
      where: {id}
    }).then((product) => {
      // Remove old photo
      const {picture} = product
      if (picture) {
        const picPath = path.join(__dirname, "..", "public", "images", picture);
        if (fs.existsSync(picPath)) {
          fs.unlink(picPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
      }
      const deletePromise = db.Product.destroy({
        where: { id }
      }).then(() => res.redirect('/product'))
    })
  },
  productForm: (req, res) => {
    db.Category.findAll()
      .then(function (categories) {
        console.log(categories);
        res.render('../views/productForm.ejs', { categories });
      })
  },
}

module.exports = productController;





/* let idProduct = req.params.id;
        let product= listProducts[idProduct - 1];

        console.log(product)

        let preference = {
            items: [
                {
                    title: product.title,
                    unit_price: product.price,
                    quantity: 1,
                }
            ]
        }; /

        / mercadopago.preferences.create(preference)
            .then(function (response) {
                res.render('detalle', {
                    post: {
                        description: preference.items[0].title,
                        quantity: preference.items[0].quantity,
                        transactionAmount: preference.items[0].unit_price * preference.items[0].quantity,
                        id: response.body.id,
                        init_point: response.body.init_point,
                    },
                    product: product,
                    listProducts: listProducts
                });
            }).catch(function (error) {
                console.log(error);
            }); */