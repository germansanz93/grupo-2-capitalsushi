//modulos requeridos
const express = require('express');
const router = express.Router();
const { 
  index, 
  contact, 
  menu, 
  cart, 
  chart,
  notfound
} = require('../controllers/mainController');
const authMiddleware = require('../middleware/authMiddleware');

const guestMiddleware = require('../middleware/guestMiddleware');

//rutas
router.route('/')
  .get(index)
router.get('/contact', contact)
router.get('/menu', menu)
router.get('/cart', authMiddleware, cart)
router.get('/chart', chart)
router.get('*', notfound)


//module export
module.exports = router;