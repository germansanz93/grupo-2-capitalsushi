const { readFileSync, writeFile } = require('fs');
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
  getUserById: async function (id) {
    let user = await this.getAll().find(user => user.id === id);
    if (user) return user;
    else throw 'User Not Found';
  },

  getUserByEmail: async function (email) {
    try {
      let user = await this.getAll().find(user => user.email === email);
      if (user) return user;
      else throw 'User Not Found';
    } catch {
      console.log('user not found')
      return null
    }
  },

  //update user
  updateUser: function (id, user) {
    const users = this.getAll();
    let dbUser = users.find(user => user.id === id);
    if (dbUser) {
      dbUser.name = user.name;
      dbUser.user_name = user.user_name;
      dbUser.last_name = user.last_name;
      dbUser.email = user.email;
      dbUser.password = user.password;
      dbUser.address = user.address;

      users.forEach(function (user, index) {
        if (user.id === id) {
          users[index] = dbUser;
        }
      })
      writeFile(this.usersFilePath, JSON.stringify(users, null, 2), { encoding: 'utf8' }, (err) => {
        if (err) throw err;
      });
    } else {
      return 'User Not Found';
    }

    return dbUser;
  },

  //create user
  createUser: async function (user) {
    user.id = uuidv4();
    const users = await this.getAll();
    users.push(user);
    console.log(users)
    await writeFile(this.usersFilePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' }, (error) => {
      if (error) throw error;
      return this.getUserById(user.id);
    });
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