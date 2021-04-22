const { User } = require('../models');

const userData = [
  {
    username: "Grian",
    email: "Grian@gmail.com",
    password: "password1234"
  },
  {
    username: "Josh",
    email: "josh@gmail.com",
    password: "password1234"
  },
  {
    username: "Mumbo",
    email: "Mumbo@gmail.com",
    password: "password1234"
  },
];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;