import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer'
import TaskList from "./components/TaskList";

// TODO вынести куда то нужно
Date.prototype.getFullSeconds = function () {
  return this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds();
};

Date.prototype.getFullMinutes = function () {
  return this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
};

Date.prototype.getFullHours = function () {
  return this.getHours() < 10 ? '0' + this.getHours() : this.getHours();
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