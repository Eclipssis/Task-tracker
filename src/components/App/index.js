import React, { Component } from 'react';
import Timer from '../Timer'
import TaskBlock from '../TaskBlock'
import './index.css';
import {connect} from "react-redux";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Timer/>
        <TaskBlock tabContainer={this.props.tabContainer} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  let tabId;

  switch (ownProps.location.pathname) {
    case '/':
      tabId = 0;
      break;

    case '/task_log':
      tabId = 0;
      break;

    case '/task_chart':
      tabId = 1;
      break;

    default:
      return tabId = 0;
  }

  return {
    tabContainer: tabId
  };
};

export default connect(mapStateToProps)(App);