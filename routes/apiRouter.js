//modulos requeridos
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { 
  getProducts
} = require('../controllers/apiController');

const path = require('path');
const imagesPath = path.join(__dirname, '../public/images')

// rutas
router.get('/products', getProducts)
module.exports = router;