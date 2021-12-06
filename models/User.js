const {readFile, writeFile} = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const User = {

  usersFilePath: path.join(__dirname, '../data/UsersCapitalSushi.json'),

  // get all users
  getAll: function () {
    let users;
    try {
      users = readFile(this.usersFilePath, 'utf8');
    } catch (err) {
      console.log(err);
      return (err);
    }
    return JSON.parse(users);
  },

  //get one user
  getUserById: function (id) {
    let user = this.getAll().find(user => user.id === id);
    if (user) return user;
    else return 'User Not Found';
  },

  //update user
  updateUser: function (id, user) {
    const users = this.getAll();
    let dbUser = users.find(user => user.id === id);
    if (dbUser) {
      dbUser.name = user.name;
      dbUser.email = user.email;
      dbUser.password = user.password;
      dbUser.address = user.address;
      dbUser.phone = user.phone;
      dbUser.role = user.role;
      dbUser.image = user.image;

      users.forEach(function (user, index) {
        if (user.id === id) {
          users[index] = dbUser;
        }
      })
      fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
    } else {
      return 'User Not Found';
    }

    return dbUser;
  },

  //create user
  createUser: async function (user) {
    user.id = uuidv4();
    const users = this.getAll();
    users.push(user);
    await writeFile(this.usersFilePath, JSON.stringify(users, null, 2));
    return this.getUserById(id);
  },

  //delete user
  deleteUser: async function (id) {
    const users = this.getAll();
    users = users.filter(user => user.id != id);
    await writeFile(this.usersFilePath, JSON.stringify(users, null, 2));
    return true;
  }
};

module.exports = User;