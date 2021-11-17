//modulos requeridos
const express = require('express')
const router = express.Router();
const mainController = require('../controllers/mainController')
const multer = require('multer');
const path = require('path');

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const imagesPath = path.join(__dirname, '../public/images')


//rutas
router.route('/')
  .get(mainController.index)
  .post(upload.single('image'), mainController.crearProducto);
router.get('/contacto', mainController.contacto)
router.get('/menu', mainController.menu)
router.get('/carrito', mainController.carrito)
router.get('/mi_cuenta', mainController.miCuenta)
router.get('/registrarse', mainController.registrarse)
router.get('/formulario_producto', mainController.formularioProducto)
router.get('/cartilla', mainController.cartilla)

//module export
module.exports = router;