//modulos requeridos
const express = require('express');
const router = express.Router();
const { 
  index, 
  contact, 
  menu, 
  cart, 
  chart,
  cpanel
} = require('../controllers/mainController');

const guestMiddleware = require('../middleware/guestMiddleware');

//rutas
router.route('/')
  .get(index)
router.get('/contact', contact)
router.get('/menu', menu)
router.get('/cart', cart)
router.get('/chart', chart)


//module export
module.exports = router;