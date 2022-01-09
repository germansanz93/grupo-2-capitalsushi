const { readFileSync, writeFileSync, writeFile } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const User = {

  usersFilePath: path.join(__dirname, '../data/UsersCapitalSushi.json'),

  // get all users
  getAll: function () {
    let users;
    try {
      users = readFileSync(this.usersFilePath, 'utf8');
    } catch (err) {
      return (err);
    }
    return JSON.parse(users);
  },

  //get one user
  getUserById: function (id) {
    let user = this.getAll().find(user => user.id === id);
    if (user) return user;
    else throw 'User Not Found';
  },

  getUserByEmail: function (email) {
    try {
      let user = this.getAll().find(user => user.email === email);
      if (user) return user;
      else throw 'User Not Found';
    } catch {
      console.log('user not found')
      return null
    }
  },

  //update user
  updateUser: function (id, user) {
    delete user.password;
    const users = this.getAll();
    let dbUser = users.find(user => user.id === id);
    console.log(dbUser);
    if (dbUser) {
      for(let key in user){
        dbUser[key] = user[key];
      }

      users.forEach(function (user, index) {
        if (user.id === id) {
          users[index] = dbUser;
        }
      })
      writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2), { encoding: 'utf8' });
    } else {
      return 'User Not Found';
    }

    return dbUser;
  },

  //create user
  createUser: async function (user) {
    console.log('User.js: create user', user)
    user.id = uuidv4();
    const users = await this.getAll();
    users.push(user);
    await writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
    return user
  },

  //delete user
  deleteUser: async function (id) {
    let users = this.getAll();
    users = users.filter(user => user.id != id);
    await writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
    return true;
  }
};

module.exports = User;