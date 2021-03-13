const Sequelize = require('sequelize');
const db = require('./database');

const Task = db.define('task', {
  text: Sequelize.STRING,
  user: Sequelize.JSON,
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Task;

Task.createTask = (text, sender, receiver) => {
  return Promise.all([
    Task.create({
      text,
      user: {
        _id: sender.id,
        name: sender.name,
      },
    }),
    db.models.list.findOrCreateList(sender.id, receiver.id),
  ]).then(([task, list]) => task.setConversation(list));
};
