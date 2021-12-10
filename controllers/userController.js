const { validationResult } = require('express-validator');
const User = require('../models/User');

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.getAll();
    res.send(users)
  },
  getUserById: async (req, res) => {
    const user = await User.getUserById(req.params.id);
    res.send(user)
  },
  createUser: (req, res) => {
    const result = validationResult(req.body);
    if (!result.isEmpty()){
      return res.render('../views/registrarse.ejs', {
        errors: result.mapped(),
        oldData: req.body
      })
    }
    const user = req.body.user;
    res.send(User.createUser(user));
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    res.send(User.deleteUser(id));

  },
  editUser: (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
      return res.render('../views/registrarse.ejs', {
        errors: result.mapped(),
        oldData: req.body
      })
    }
    const id = req.params.id;
    const user = req.body.user;
    res.send(User.update(user));
  },
  login: (req, res) => {
    console.log(req.body);
    res.redirect('/');
  }

}