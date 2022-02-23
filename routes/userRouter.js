//modules require
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { 
  getUserById, 
  editUser, 
  deleteUser, 
  account, 
  login, 
  register, 
  createUser, 
  getUsers, 
  profile, 
  logout, 
  editUserForm,
  changePassword,
  adminDeleteUser
  } = require('../controllers/userController');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const multer = require('multer');
const path = require('path');
const loggedUserMiddleware = require('../middleware/loggedUserMiddleware');

const imagesPath = path.join(__dirname, '../public/images')

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
    else cb(null, file.originalname)
  }
})

const validExtensions = ['.jpg', '.jpeg', '.png'];


const editUserValidations = [
  // body('userName').notEmpty().withMessage("El nombre de usuario es obligatorio."),
  body('name').notEmpty().withMessage("El nombre no puede estar vacio."),
  body('last_name').notEmpty().withMessage("El apellido no puede estar vacio."),
  body('address').notEmpty().withMessage("La direccion no puede estar vacia."),
  body('email').normalizeEmail().isEmail().withMessage("Debe ingresar una direccion de mail valida").bail()
    .notEmpty().withMessage("La descripcion no puede estar vacia"),
]

const passwordValidations = [
  body('password').notEmpty().withMessage('Debe ingresar una contraseña.').bail()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
]

const createUserValidations = [
  ...editUserValidations,
  ...passwordValidations,
  body('profile_pic').custom((value, { req }) => {
    const file = req.file;
    if (!file) {
      throw new Error("Debes agregar una imagen en formato jpg, jpeg o png")
    }
    return true;
  })
]





//rutas
router.route('/')
  .get(adminMiddleware, getUsers)

router.route('/login')
  .get(guestMiddleware, account)
  .post(login);

router.route('/register')
  .get(guestMiddleware, register)
  .post(loggedUserMiddleware ,upload.single('profile_pic'), createUser)

router.get('/profile', authMiddleware, profile)

router.get('/logout', authMiddleware, logout)

router.route('/editUser').get(authMiddleware, editUserForm)
                              .post(editUserValidations, editUser)

router.post('/eliminar/:id', authMiddleware, deleteUser)

router.post('/:id/password', authMiddleware, passwordValidations, changePassword)

router.route('/:id')
  .get(getUserById)
  .put(editUser)
  .delete(deleteUser);

router.route('/admin/:id').delete(adminDeleteUser)

//module export
module.exports = router;