const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {secret} = require('../config/config')

const salt = bcrypt.genSaltSync(10);

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
    const user = req.body.user;
    res.send(User.update(user));
  },
  login: async (req, res) => {
    const {email, password} = req.body;
    console.log(email)
    try{
      const user = await User.getUserByEmail(email);
    } catch {
      console.log('user not found')
      res.render('../views/mi_cuenta')
      return
    }
    console.log(user)
    if(user && bcrypt.compareSync(password, user.password)){
      const token = jwt.sign(user, secret);
      console.log(token);
    }
    res.redirect('/');
  }
}