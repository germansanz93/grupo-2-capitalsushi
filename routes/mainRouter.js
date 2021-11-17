const express = require('express')
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.index)
router.get('/contacto', mainController.contacto)
router.get('/menu', mainController.menu)
router.get('/carrito', mainController.carrito)
router.get('/mi_cuenta', mainController.miCuenta)
router.get('/registrarse', mainController.registrarse)
router.get('/formulario_producto', mainController.formularioProducto)
router.get('/cartilla', mainController.cartilla)

module.exports = router;