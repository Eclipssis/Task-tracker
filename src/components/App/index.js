import React, { Component } from 'react';
import Timer from '../Timer'
import TaskBlock from '../TaskBlock'
import './index.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Timer/>
        <TaskBlock/>
      </div>
    );
  }
}

export default App;