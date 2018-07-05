import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import App from './components/App';
import TaskDetail from "./components/Task/index";
import PageNotFound from './components/PageNotFound'
import reducer from './reducers'
import { HashRouter, Route, Switch } from 'react-router-dom'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={'/task/:id'} component={TaskDetail} />
        <Route path={'/'}  component={App} />
        <Route component={PageNotFound} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);