import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer'
import TaskBlock from './components/TaskBlock'

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Hello React!!!</h1>
        <Timer/>
        <TaskBlock />
      </div>
    );
  }
}

export default App;