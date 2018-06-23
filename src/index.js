import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import { createStore } from 'redux';

let taskList = localStorage.getItem('tasks');
taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

console.log(taskList);

const initialState = [
  ...taskList
];

function reducerName(state = initialState, action) { // TODO разделить редьюсеры
  if(action.type === "ADD_TASK") {

    // Add task to localStorage
    localStorage.setItem('tasks', JSON.stringify([ ...state, action.payload ]));

    // Add task to store
    return [ ...state, action.payload ]
  }

  if(action.type === "DELETE_TASK") {
    let taskId = action.payload;

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

const store = createStore(reducerName, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);