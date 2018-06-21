import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer'
import TaskList from "./components/TaskList";

// TODO вынести куда то нужно
Date.prototype.getFullSeconds = function () {
  if (this.getSeconds() < 10) {
    return '0' + this.getSeconds();
  }
  return this.getSeconds();
};

Date.prototype.getFullMinutes = function () {
  if (this.getMinutes() < 10) {
    return '0' + this.getMinutes();
  }
  return this.getMinutes();
};

Date.prototype.getFullHours = function () {
  if (this.getHours() < 10) {
    return '0' + this.getHours();
  }
  return this.getHours();
};


class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Hello React!!!</h1>
        <Timer/>
        <TaskList/>
      </div>
    );
  }
}

export default App;