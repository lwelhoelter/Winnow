// const app = require('http');
// const server = app.createServer.listen(3000);
const server = require('http').createServer().listen(3000);

const db = require('./models').db;
const io = require('socket.io')(server);
const {User, List, Task} = require('./models').models;
db.sync({logging: false, force: true});
const mobileSockets = {};

io.on('connection', (socket) => {
  socket.on('newUser', (credentials) => {
    const {name, password} = credentials;
    Promise.all([
      User.findOrCreate({
        where: {
          name,
          password,
        },
      }),
      User.findAll(),
    ]).then(([user, users]) => {
      mobileSockets[user[0].id] = socket.id;
      socket.emit('userCreated', {user: user[0], users});
      socket.broadcast.emit('newUser', user[0]);
    });
  });
  socket.on('list', (users) => {
    List.findOrCreateList(users.user.id, users.receiver.id).then((list) =>
      socket.emit('priorMessages', list.tasks),
    );
  });
  socket.on('task', ({text, sender, receiver}) => {
    Task.createTask(text, sender, receiver).then((task) => {
      socket.emit('incomingTask', task);
      const receiverSocketId = mobileSockets[receiver.id];
      socket.to(receiverSocketId).emit('incomingTask', task);
    });
  });
});

module.exports = server;
