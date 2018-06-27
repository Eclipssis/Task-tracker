import React, { Component } from 'react';
import Timer from '../Timer'
import TaskBlock from '../TaskBlock'
import './App.css';

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