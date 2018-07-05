import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogAlert from '../DialogAlert'
import getTimeDifference from '../../helpers/getTimeDifference'
import formatToDisplay from '../../helpers/formatToDisplay'
import createTask from '../../helpers/createTask'
import onAddTask from '../../actions/Task/add'
import './index.css'

class Timer extends Component {

  state = {
    isActive : false,
    timerID  : null,

    time : '00:00:00',

    taskTitle     : '',
    taskStartTime : '',
  };

  componentWillMount() {

    let isActiveTimer = JSON.parse(localStorage.getItem('isActive'));

    if(isActiveTimer === true) {

      let timeStart = new Date(Date.parse(localStorage.getItem('taskStartTime')));
      let timeNow   = new Date();

      let time  = getTimeDifference(timeStart, timeNow);

      time = formatToDisplay(time.hours) + ':'
               + formatToDisplay(time.minutes) + ':'
               + formatToDisplay(time.seconds);

      this.setState({
        time:   time,
        taskTitle: localStorage.getItem('taskTitle'),
        isActive: isActiveTimer,
        taskStartTime: timeStart
      });

      this.startTimer();
    }
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

      let time = getTimeDifference(this.state.taskStartTime, new Date());

      time = formatToDisplay(time.hours) + ':'
           + formatToDisplay(time.minutes) + ':'
           + formatToDisplay(time.seconds);


      this.setState({
        time: time
      });

    }, 1000);

    localStorage.setItem('timderID', String(timerID));
    return timerID;
  };

  stopTimer = () => {

    const storeLength = this.props.tasksLength;

    let nextId = storeLength > 0 ? storeLength + 1 : 1;
    let taskTitle = this.state.taskTitle;
    let taskStart = new Date(Date.parse(localStorage.getItem('taskStartTime')));
    let taskEnd = new Date();

    let task = createTask(nextId, taskTitle, taskStart, taskEnd);
    this.props.onAddTask(task);

    this.setState({
      isActive: false,
      time: '00:00:00',
      taskTitle: ''
    });

    let timerIdStorage = localStorage.getItem('timderID');
    let TimerID = timerIdStorage ? timerIdStorage : this.state.timerID;

    localStorage.removeItem('isActive');
    localStorage.removeItem('taskTitle');

    clearInterval(TimerID);
  };

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
        <div className="timer__body">{this.state.time}</div>

        {this.state.isActive ?
          <Button variant="outlined" onClick={this.stopTimer}>Stop</Button>
          :
          <Button variant="outlined" onClick={this.activateTimer}>Start</Button>
        }
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({onAddTask: onAddTask}, dispatch)
}

function mapStateToProps(state) {
  console.log(state);
  return {
    tasksLength: state.tasks.taskList.length
  }
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Timer);