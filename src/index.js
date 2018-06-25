import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import App from './App';
import TaskDetail from "./components/Task/show";
import PageNotFound from './components/PageNotFound'

import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'react-router/node_modules/history/createBrowserHistory'
import TaskList from "./components/TaskList";

let history = createBrowserHistory();

// let taskList = localStorage.getItem('tasks');
// taskList = JSON.parse(taskList) ? JSON.parse(taskList) : [];

const initialData = [

  {id: 1, title: "Learn react", start: '25.06.2018 01:15:30', end: '25.06.2018 04:00:50', timeSpend: "01:00:06"},
  {id: 2, title: "Learn redux", start: '25.06.2018 18:30:30', end: '25.06.2018 18:40:40', timeSpend: "00:10:20"},
  {id: 3, title: "Init project", start: '25.06.2018 17:42:24', end: '25.06.2018 17:42:24', timeSpend: "00:00:02"},
  {id: 2, title: "Create timer", start: '25.06.2018 12:10:00', end: '25.06.2018 12:20:00', timeSpend: "00:05:00"},
  {id: 3, title: "Create timer", start: '25.06.2018 12:40:00', end: '25.06.2018 12:50:00', timeSpend: "00:05:00"},
  {id: 4, title: "Add crud", start: '25.06.2018 13:20:00', end: '25.06.2018 13:30:00', timeSpend: "00:35:00"},
  {id: 5, title: "Add crud", start: '25.06.2018 14:45:00', end: '25.06.2018 14:50:00', timeSpend: "00:35:00"},
  {id: 6, title: "Create timer", start: '25.06.2018 17:40:00', end: '25.06.2018 17:45:00', timeSpend: "00:05:00"},
  {id: 6, title: "Create Table", start: '25.06.2018 17:50:10', end: '25.06.2018 17:50:30', timeSpend: "02:10:00"},
  {id: 8, title: "Implement router", start: '25.06.2018 18:30:10', end: '25.06.2018 18:35:50', timeSpend: "02:00:00"},
  {id: 9, title: "Refactor code", start: '25.06.2018 20:20:00', end: '25.06.2018 20:30:30', timeSpend: "01:10:00"},

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
    <Router history={history}>
      <Switch>
        <Route path={'/'} exact component={App} />
        <Route path={'/task/:id'} component={TaskDetail} />
        <Route path={'/log'} component={TaskList} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);