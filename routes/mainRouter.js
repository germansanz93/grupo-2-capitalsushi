//modulos requeridos
const express = require('express');
const router = express.Router();
const { 
  index, 
  contact, 
  menu, 
  cart, 
  chart, 
} = require('../controllers/mainController');

const guestMiddleware = require('../middleware/guestMiddleware');

//rutas
router.route('/')
  .get(index)
router.get('/contacto', contact)
router.get('/menu', menu)
router.get('/carrito', cart)
router.get('/cartilla', chart)


//module export
module.exports = router;