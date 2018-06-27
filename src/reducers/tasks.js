let taskList = localStorage.getItem('tasks');
taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

const initialState = {
  ...taskList
};

export default function taskReducer(state = initialState, action) {
  if(action.type === "ADD_TASK") {
    state = Object.values(state);

    // Add task to localStorage
    localStorage.setItem('tasks', JSON.stringify([ ...state, action.payload ]) );

    // Add task to store
    return [ ...state, action.payload ]
  }

  if(action.type === "GENERATE_TASKS") {
    return action.payload
  }

  if(action.type === "DELETE_TASK") {
    let taskId = action.payload;
    state = Object.values(state);

    let newTaskArray = state.filter(function (task) {
      return taskId !== task.id;
    });

    // Delete task from localStorage
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(newTaskArray));

    return newTaskArray
  }

  return state;
}

