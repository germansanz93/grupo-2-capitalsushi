//modules require
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

const validations = [
  body('user_name').notEmpty().withMessage("El nombre de usuario es obligatorio."),
  body('name').notEmpty().withMessage("El nombre no puede estar vacio."),
  body('lastName').notEmpty().withMessage("El apellido no puede estar vacio."),
  body('address').notEmpty().withMessage("La direccion no puede estar vacia."),
  body('email').normalizeEmail().isEmail().withMessage("Debe ingresar una direccion de mail valida").bail()
    .notEmpty().withMessage("La descripcion no puede estar vacia"),
  body('password').notEmpty().withMessage('Debe ingresar una contraseña.').bail()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
]


//rutas
router.route('/')
  .get(userController.getUsers)
  .post(validations, userController.createUser)

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.editUser)
  .delete(validations, userController.deleteUser)


//module export
module.exports = router;