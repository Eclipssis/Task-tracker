let taskList = localStorage.getItem('tasks');
taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

const initialState = [...taskList];

export default function taskReducer(state = initialState, action) {

  switch (action.type) {

    case "ADD_TASK":
      localStorage.setItem('tasks', JSON.stringify([ ...state, action.payload ]) );
      return [ ...state, action.payload ];

    case "GENERATE_TASKS":
      localStorage.removeItem('tasks');
      localStorage.setItem('tasks', JSON.stringify(action.payload));
      return action.payload;

    case "DELETE_TASK":
      let taskId = action.payload;

      let newTaskArray = state.filter(function (task) {
        return taskId !== task.id;
      });

      localStorage.removeItem('tasks');
      localStorage.setItem('tasks', JSON.stringify(newTaskArray));
      return newTaskArray;

    default:
      return state
  }

}

