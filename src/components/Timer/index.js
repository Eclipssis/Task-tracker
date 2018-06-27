import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogAlert from '../DialogAlert'
import getTimeDifference from '../../helpers/getTimeDifference'
import formatToDisplay from '../../helpers/formatToDisplay'
import createTask from '../../helpers/createTask'
import './timer.css'

class Timer extends Component {

  state = {
    isActive : false,
    timerID  : null,

    seconds : '00',
    minutes : '00',
    hours   : '00',

    taskTitle     : '',
    taskStartTime : '',
  };

  componentWillMount() {

    let isActiveTimer = JSON.parse(localStorage.getItem('isActive'));

    if(isActiveTimer === true) {
      this.startTimer();

      let startTask = localStorage.getItem('taskStartTime');
      let timeStart = new Date(Date.parse(startTask));
      let timeNow   = new Date();
      let timeDiff  = getTimeDifference(timeStart, timeNow);

      this.setState({
        seconds:   formatToDisplay(timeDiff.seconds),
        minutes:   formatToDisplay(timeDiff.minutes),
        hours:     formatToDisplay(timeDiff.hours),
        taskTitle: localStorage.getItem('taskTitle'),
        isActive: isActiveTimer
      })
    }
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

  changeTaskTitle = (event) => {
    this.setState({taskTitle: event.target.value})
  };

  activateTimer = () => {

    if(this.state.taskTitle.length < 1) {
      this.refs.dialog.handleClickOpen();
      return false;
    }

    this.setState({
      isActive: true,
      timerID: this.startTimer(),
      taskStartTime: new Date()
    });

    localStorage.setItem('isActive', true);
    localStorage.setItem('taskStartTime', new Date());
    localStorage.setItem('taskTitle', this.state.taskTitle);
  };

  startTimer = () => {

    let timerID = setInterval(() => {

      let seconds = formatToDisplay(+this.state.seconds + 1);
      localStorage.setItem('seconds', seconds);

      this.setState({
        seconds: seconds
      });

      if(+this.state.seconds > 59) {

        let minutes = formatToDisplay(+this.state.minutes + 1);
        localStorage.setItem('minutes', minutes);

        this.setState({
          seconds: '00',
          minutes: minutes
        })
      }

      if(+this.state.minutes > 59) {

        let hours = formatToDisplay(+this.state.hours + 1);
        localStorage.setItem('minutes', hours);

        this.setState({
          minutes: '00',
          hours: hours
        })
      }

    }, 1000);

    localStorage.setItem('timderID', String(timerID));
    return timerID;
  };

  stopTimer = () => {

    const storeLength = Object.values(this.props.store.tasks).length;

    let nextId = storeLength > 0 ? storeLength + 1 : 1;
    let taskTitle = this.state.taskTitle;
    let taskStart = new Date(Date.parse(localStorage.getItem('taskStartTime')));
    let taskEnd = new Date();

    let task = createTask(nextId, taskTitle, taskStart, taskEnd);
    this.props.onAddTask(task);

    this.setState({
      isActive: false,
      seconds: '00',
      minutes: '00',
      hours: '00',
      taskTitle: ''
    });

    let timerIdStorage = localStorage.getItem('timderID');
    let TimerID = timerIdStorage ? timerIdStorage : this.state.timerID;

    localStorage.removeItem('isActive');
    localStorage.removeItem('taskTitle');

    clearInterval(TimerID);
  };
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onAddTask: (task) => {
      dispatch({ type: 'ADD_TASK', payload: task})
    }
  })
)(Timer);