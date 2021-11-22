//modulos requeridos
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

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

const upload = multer({ storage: storage})

const imagesPath = path.join(__dirname, '../public/images')

const validations = [
  body('title').notEmpty().withMessage("El titulo no puede estar vacio."),
  body('price').isNumeric({min: 0.01}).withMessage("El precio debe ser mayor a cero."),
  body('description').notEmpty().withMessage("La descripcion no puede estar vacia"),
  body('image').custom((value, { req }) => {
    const file = req.file;
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    if(!file){
      throw new Error("Debes agregar una imagen")
    }
    const extension = path.extname(file.originalname);
    if(!validExtensions.includes(extension)){
      throw new Error("La iamgen debe estar en formato jpg, jpeg o png");
    }
    return true;
  })
]

//rutas
router.route('/')
  .get(mainController.index)
  .post(upload.single('image'), validations, mainController.crearProducto);
router.get('/contacto', mainController.contacto)
router.get('/menu', mainController.menu)
router.get('/carrito', mainController.carrito)
router.get('/mi_cuenta', mainController.miCuenta)
router.get('/registrarse', mainController.registrarse)
router.get('/crear_producto', mainController.formularioProducto)
router.get('/editar_producto/:id', mainController.formularioProducto)
router.get('/cartilla', mainController.cartilla)

//module export
module.exports = router;