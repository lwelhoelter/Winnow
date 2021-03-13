// ACTION TYPES

const GOT_TASKS = 'GOT_TASKS';
const GOT_NEW_TASK = 'GOT_NEW_TASK';

// ACTION CREATORS

export const gotTasks = (tasks) => ({type: GOT_TASKS, tasks});
export const gotNewTask = (task) => ({type: GOT_NEW_TASK, task});

//REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_TASKS:
      return action.tasks ? action.tasks : [];
    case GOT_NEW_TASK:
      return [action.task, ...state];
    default:
      return state;
  }
};
export default reducer;
