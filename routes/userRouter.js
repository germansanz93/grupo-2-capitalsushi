//modules require
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//rutas
router.route('/')
  .get(userController.getUsers);

router.route('/:id')
  .get(userController.getUserById)


//module export
module.exports = router;