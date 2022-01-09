const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');

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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result);
      return res.render('../views/registrarse.ejs', {
        errors: result.mapped(),
        oldData: req.body
      })
    }
    const userInDB = User.getUserByEmail(req.body.email);
    if (userInDB && userInDB != null) {
      console.log('el usuario ya existe', userInDB)
      return res.render('../views/registrarse.ejs', {
        errors: {
          email: 'El email ya esta registrado'
        },
        oldData: req.body
      })
    }
    const user = { ...req.body };
    user.profilePic = req.file.filename;
    user.password = bcrypt.hashSync(user.password, salt);
    delete user.passwordConfirmation;
    User.createUser(user)

    req.session.user = user;
    console.log(req.session.user);
    res.redirect('/usuario/perfil');
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    console.log(id, password);
    dbUser = User.getUserById(id);
    if(bcrypt.compareSync(password, dbUser.password)){
      User.deleteUser(id);
      res.redirect('/');
    } else {
      delete dbUser.password;
      res.render('../views/editarUsuario.ejs', {errors: {credentialsError: "Invalid password"}, oldData: {...dbUser}});
    }
    // res.send(User.deleteUser(id));
  },
  editUserForm: (req, res) => {
    res.render(path.join(__dirname, '../views/editarUsuario'));
  },
  editUser: (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result)
      return res.render('../views/editarUsuario.ejs', {
        errors: result.mapped(),
        oldData: req.body
      })
    }
    const user = { ...req.body };
    const id = req.session.user.id;
    
    dbUser = User.getUserById(id);

    if(bcrypt.compareSync(user.password, dbUser.password)){
      req.session.user = User.updateUser(id, user);
      res.redirect('/usuario/perfil');
    } else {
      console.log('contraseña incorrecta')
      return res.render('../views/editarUsuario.ejs', {
        errors: {
          password: 'La contraseña es incorrecta'
        },
        oldData: req.body
      })
    }
  },
  account: (req, res) => {
    res.render(path.join(__dirname, '../views/mi_cuenta.ejs'));
  },
  register: (req, res) => {
    res.render(path.join(__dirname, '../views/registrarse.ejs'));
  },
  login: async (req, res) => {
    const { email, password, remember } = req.body;
    let user;
    try {
      user = await User.getUserByEmail(email);
    } catch {
      res.render('mi_cuenta.ejs', { errors: { credentialsError: "credenciales invalidas" } })
      return
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      req.session.user = user;
      if (req.body.remember != undefined) req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      return res.status(200).redirect('/usuario/perfil');
    }
    const oldData = { user, email }
    const errors = { credentialsError: "credenciales invalidas" }
    res.render('mi_cuenta.ejs', { oldData, errors })
  },
  profile: (req, res) => {
    res.render('profile.ejs');
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
}