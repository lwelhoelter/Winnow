const db = require('./database');
const List = require('./List');
const Task = require('./Task');
const User = require('./User');

User.hasMany(List);
List.belongsTo(User, {as: 'user1'});
List.belongsTo(User, {as: 'user2'});
Task.belongsTo(List);
List.hasMany(Task);

module.exports = {
  db,
  models: {
    List,
    User,
    Task,
  },
};
