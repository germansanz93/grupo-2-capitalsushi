//modulos requeridos
const express = require('express');
const router = express.Router();
const { 
  createOrder,
} = require('../controllers/orderController');

const guestMiddleware = require('../middleware/guestMiddleware');

//rutas
router.route('/')
  .post(createOrder)


//module export
module.exports = router;