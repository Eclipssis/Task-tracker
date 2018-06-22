import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogAlert from '../DialogAlert'
import './timer.css'


let taskListStorage      = JSON.parse(localStorage.getItem('tasks'));

let secondStorage        = localStorage.getItem('seconds');
let minutesStorage       = localStorage.getItem('minutes');
let hoursStorage         = localStorage.getItem('hours');
let isActiveStorage      = localStorage.getItem('isActive');
let taskTitleStorage     = localStorage.getItem('taskTitle');
let taskStartTimeStorage = localStorage.getItem('taskStartTime');

class Timer extends Component {

  state = {
    isActive : isActiveStorage ? JSON.parse(isActiveStorage) : false,
    timerID  : null,

    seconds : secondStorage ? secondStorage : '00',
    minutes : minutesStorage ? minutesStorage : '00',
    hours   : hoursStorage  ? hoursStorage : '00',

    // TODO Разедить Task и Timer ?
    taskList      : taskListStorage ? taskListStorage : [],
    taskTitle     : taskTitleStorage ? taskTitleStorage : '',
    taskStartTime : taskStartTimeStorage ? taskStartTimeStorage : '',
    taskEndTime   : '',
    taskTime      : ''
  };

  componentWillMount() {
    if(this.state.isActive === true) this.startTimer();
  }

  render() {
    return (
      <div className="timer">
        <DialogAlert
          ref="dialog"
          dialogTitle='Empty task name'
          dialogText='You are trying close your task without name, enter the title and try again'
          classesName='dialog-title-red'
        />
        <TextField
          label="Name of your task"
          fullWidth={true}
          margin="normal"
          value={this.state.taskTitle}
          onChange={this.changeTaskTitle}
        />
        <div className="timer__body">
          {this.state.hours}:
          {this.state.minutes}:
          {this.state.seconds}
        </div>

        {this.state.isActive ?
          <Button variant="outlined" onClick={this.stopTimer}>Stop</Button>
          :
          <Button variant="outlined" onClick={this.activateTimer}>Start</Button>
        }
      </div>
    );
  }

  formatNubmer = (number) => {
    return (number < 10 ? '0' : '') + number
  };

  changeTaskTitle = (event) => {
    this.setState({taskTitle: event.target.value})
  };

  createTask = (taskTitle) => {

    let nextId = taskListStorage ? taskListStorage[taskListStorage.length - 1].id + 1 : 0;
    let endTask = new Date();
    let taskTime = Date.parse(endTask) - Date.parse(this.state.taskStartTime);
    taskTime /= 1000;

    let seconds = Math.round(taskTime % 60);
    if(seconds < 10) {
      seconds = '0' + seconds
    }

    taskTime = Math.floor(taskTime / 60);
    let minutes = Math.round(taskTime % 60);
    if(minutes < 10) {
      minutes = '0' + minutes
    }

    taskTime = Math.floor(taskTime / 60);
    let hours = Math.round(taskTime % 24);
    if(hours < 10) {
      hours = '0' + hours
    }

    let totalTimeSpend =  hours + ':' + minutes + ':' + seconds;

    return {
      id: nextId,
      title: taskTitle,
      start: this.state.taskStartTime,
      end: endTask,
      timeSpend: totalTimeSpend
    }
  };

  activateTimer = () => {

    if(this.state.taskTitle.length < 1) {
      this.refs.dialog.handleClickOpen();
      return false;
    }

    let startTask = new Date();
    localStorage.setItem('isActive', true);
    localStorage.setItem('taskStartTime', startTask);
    localStorage.setItem('taskTitle', this.state.taskTitle);

    this.setState({
      isActive: true,
      timerID: this.startTimer(),
      taskStartTime: startTask
    });
  };

  startTimer = () => {
    let timerSpeed = 1000;

    let timerID = setInterval(() => {

      let seconds = this.formatNubmer(+this.state.seconds + 1);
      localStorage.setItem('seconds', seconds);

      this.setState({
        seconds: seconds
      });

      if(+this.state.seconds > 59) {

        let minutes = this.formatNubmer(+this.state.minutes + 1);
        localStorage.setItem('minutes', minutes);

        this.setState({
          seconds: '00',
          minutes: minutes
        })
      }

      if(+this.state.minutes > 59) {

        let hours = this.formatNubmer(+this.state.hours + 1);
        localStorage.setItem('minutes', hours);

        this.setState({
          minutes: '00',
          hours: hours
        })
      }

    }, timerSpeed);

    localStorage.setItem('timderID', timerID);
    return timerID;
  };


  stopTimer = () => {

    let task = this.createTask(this.state.taskTitle);
    this.state.taskList.push(task);

    let strData = JSON.stringify(this.state.taskList);
    localStorage.setItem('tasks', strData);

    localStorage.removeItem('seconds');
    localStorage.removeItem('minutes');
    localStorage.removeItem('hours');

    localStorage.removeItem('isActive');
    localStorage.removeItem('taskTitle');

    this.setState({
      isActive: false,
      seconds: this.formatNubmer(0),
      minutes: this.formatNubmer(0),
      hours: this.formatNubmer(0),
      taskTitle: ''
    });

    let timerIDStorage = localStorage.getItem('timderID');
    let TimerID = timerIDStorage ? timerIDStorage : this.state.timerID;

    clearInterval(TimerID);
  };


}

export default Timer;