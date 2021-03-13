const Sequelize = require('sequelize');
const db = require('./database');

const User = db.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
