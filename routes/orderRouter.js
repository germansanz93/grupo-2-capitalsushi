//modulos requeridos
const express = require('express');
const router = express.Router();
const { 
  createOrder,
  completeOrder,
  payOrder,
  mp
} = require('../controllers/orderController');

const guestMiddleware = require('../middleware/guestMiddleware');

//rutas
router.route('/')
  .post(createOrder)

router.route('/complete').post(completeOrder)

router.route('/pay').post(mp)

//module export
module.exports = router;