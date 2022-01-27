//modulos requeridos
const express = require('express');
const router = express.Router();
const { 
  productForm, 
  showProduct, 
  deleteProduct,
  allProducts,
  createProduct,
  editProduct
} = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const guestMiddleware = require('../middleware/guestMiddleware');

const validExtensions = ['.jpg', '.jpeg', '.png'];


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

const upload = multer({
  storage: storage, fileFilter: (req, file, cb) => {
    if (!validExtensions.includes(path.extname(file.originalname))) cb(null, false);
  }
})

const imagesPath = path.join(__dirname, '../public/images')

const validations = [
  body('title').notEmpty().withMessage("El titulo no puede estar vacio."),
  body('price').isNumeric({ min: 0.01 }).withMessage("El precio debe ser mayor a cero."),
  body('description').notEmpty().withMessage("La descripcion no puede estar vacia"),
  body('picture').custom((value, { req }) => {
    const file = req.file;
    if (!file) {
      throw new Error("Debes agregar una imagen en formato jpg, jpeg o png")
    }
    return true;
  })
]

// rutas
router.route('/')
  .get(allProducts)
  .post((req, res, next) => {console.log(req.body); next()} ,upload.single('picture'), validations, createProduct);
router.route('/new')
  .get(productForm)
router.route('/:id')
  .get(showProduct)
  .delete(deleteProduct);

  module.exports = router;