const User = require('../models/User');

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.getAll();
    res.send(users)
  },
  getUserById: async (req, res) => {
    const user = await User.getUserById(req.params.id);
    res.send(user)
  }
}