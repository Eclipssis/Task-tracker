import { GENERATE_TASKS } from '../actions/actionsTypes'
import { DELETE_TASK } from '../actions/actionsTypes'
import { ADD_TASK } from '../actions/actionsTypes'

let taskList = localStorage.getItem('tasks');
taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

const initialState = {
  taskList: [...taskList]
};

export default function taskReducer(state = initialState.taskList, action) {

  switch (action.type) {

    case ADD_TASK:
      localStorage.setItem('tasks', JSON.stringify([ ...state, action.payload ]) );
      return [ ...state, action.payload ];

    case GENERATE_TASKS:
      localStorage.removeItem('tasks');
      localStorage.setItem('tasks', JSON.stringify(action.payload));
      return action.payload;

    case DELETE_TASK:

      const newState = Object.assign([], state);
      const indexOfTaskToDelete = state.findIndex(task => {
        return task.id === action.payload
      });

      newState.splice(indexOfTaskToDelete, 1);
      localStorage.removeItem('tasks');
      localStorage.setItem('tasks', JSON.stringify(newState));

      return newState;

    default:
      return state
  }

}

