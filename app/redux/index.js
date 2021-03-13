import {createStore, combineReducers} from 'redux';
import users, {gotUsers, gotNewUser} from './users';
import tasks, {gotTasks, gotNewTask} from './tasks';
import user, {gotUser} from './user';
import socket from './socket';

let navigate;

const reducers = combineReducers({users, tasks, user});

const store = createStore(reducers);

socket.on('priorTasks', (tasks) => {
  store.dispatch(gotTasks(tasks));
});
socket.on('userCreated', (response) => {
  const {user, users} = response;
  store.dispatch(gotUser(user));
  store.dispatch(gotUsers(users));
  navigate('Users');
});
socket.on('newUser', (user) => {
  store.dispatch(gotNewUser(user));
});
socket.on('incomingTask', (task) => {
  store.dispatch(gotNewTask(task));
});

export const login = (credentials, navigation) => {
  socket.emit('newUser', credentials);
  navigate = navigation.navigate;
};
export const openList = (users) => {
  socket.emit('list', users);
};
export const sendTask = (text, sender, receiver) => {
  socket.emit('task', {text, sender, receiver});
};

export default store;
export * from './users';
export * from './tasks';
