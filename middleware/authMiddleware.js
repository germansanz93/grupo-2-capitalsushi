const User = require('../models/User');

module.exports = {
  isLogged: function (req, res, next) {
    const {userName, password} = req.body;
    console.log(userName, password)
    next();
  }
}