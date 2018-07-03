import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import App from './components/App';
import TaskDetail from "./components/Task/index";
import PageNotFound from './components/PageNotFound'
import reducer from './reducers'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

let history = createBrowserHistory();

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path={'/'} exact component={App} />
        <Route path={'/task_log'} exact component={App} />
        <Route path={'/task_chart'} exact component={App} />
        <Route path={'/task/:id'} component={TaskDetail} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);