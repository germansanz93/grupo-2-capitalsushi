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
    const userInDB = User.getUserByEmail(req.body.email);
    if(userInDB){
      return res.render('../views/registrarse.ejs', {
        errors: {
          email: 'El email ya esta registrado'
        },
        oldData: req.body
      })
    }
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, salt);
    delete user.passwordConfirmation;
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
    let user;
    try{
      user = await User.getUserByEmail(email);
    } catch {
      console.log('user not found')
      res.render('../views/mi_cuenta')
      return
    }
    if(user && bcrypt.compareSync(password, user.password)){
      const token = jwt.sign(user, secret);
      res.cookie('token', token, {
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
        httpOnly: true
      });
      res.locals.user = user;
      delete user.password;
      req.session.user = user;
      res.status(200).render('home.ejs',{token});
    }
    const oldData = {user, email}
    const errors = {credentialsError: "credenciales invalidas"}
    res.render('mi_cuenta.ejs', {oldData, errors})
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect('/');
  }
}