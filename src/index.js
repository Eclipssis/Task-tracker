import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import App from './App';
import TaskDetail from "./components/Task/show";
import PageNotFound from './components/PageNotFound'
import TaskList from "./components/TaskList";
import reducer from './reducers'

import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'react-router/node_modules/history/createBrowserHistory'


let history = createBrowserHistory();

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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