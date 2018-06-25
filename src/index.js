import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import { createStore } from 'redux';

let taskList = localStorage.getItem('tasks');
taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

const initialData = [

  {id: 1, title: "Learn react", start: '25.06.2018 00:15:30', end: '25.06.2018 04:00:50', timeSpend: "01:00:06"},
  // {id: 2, title: "Learn redux", start: '23.06.2018 18:30:30', end: '23.06.2018 18:40:40', timeSpend: "00:10:20"},
  // {id: 3, title: "Init project", start: '23.06.2018 17:42:24', end: '23.06.2018 17:42:24', timeSpend: "00:00:02"},
  // {id: 2, title: "Create timer", start: '25.06.2018 12:10:00', end: '25.06.2018 12:20:00', timeSpend: "00:05:00"},
  // {id: 3, title: "Create timer", start: '25.06.2018 12:40:00', end: '25.06.2018 12:50:00', timeSpend: "00:05:00"},
  // {id: 4, title: "Add crud", start: '25.06.2018 12:55:00', end: '25.06.2018 13:30:00', timeSpend: "00:35:00"},
  // {id: 5, title: "Add crud", start: '25.06.2018 13:45:00', end: '25.06.2018 14:50:00', timeSpend: "00:35:00"},
  // {id: 6, title: "Create timer", start: '25.06.2018 17:40:00', end: '25.06.2018 17:45:00', timeSpend: "00:05:00"},
  {id: 6, title: "Create Table", start: '25.06.2018 17:50:10', end: '25.06.2018 17:50:30', timeSpend: "02:10:00"},
  {id: 8, title: "Implement router", start: '25.06.2018 18:30:10', end: '25.06.2018 19:35:50', timeSpend: "02:00:00"},
  {id: 9, title: "Refactor code", start: '25.06.2018 19:45:00', end: '25.06.2018 20:30:30', timeSpend: "01:10:00"},
  {id: 9, title: "Second bug", start: '25.06.2018 21:59:50', end: '25.06.2018 23:55:55', timeSpend: "00:00:55"},

];

const initialState = [
  ...initialData
];





function reducerName(state = initialState, action) { // TODO разделить редьюсеры
  if(action.type === "ADD_TASK") {

    // Add task to localStorage
    localStorage.setItem('tasks', JSON.stringify([ ...state, action.payload ]) );

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