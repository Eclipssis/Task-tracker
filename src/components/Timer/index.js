import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './timer.css'

class Timer extends Component {

  state = {
    isActive: false,

    seconds: '00',
    minutes: '00',
    hours  : '00'
  };

  render() {
    return (
      <div className="timer">
        <TextField
          label="Name of your task"
          fullWidth={true}
          margin="normal"
        />
        <div className="timer__body">
          {this.state.hours}:
          {this.state.minutes}:
          {this.state.seconds}
        </div>
        <Button variant="outlined" onClick={this.activateTimer}>
          {this.state.isActive ? 'Stop' : 'Start'}
        </Button>
      </div>
    );
  }

  formatingNubmers = (number) => {
    return (number < 10 ? '0' : '') + number
  };

  startTimer = () => {
    let timerSpeed = 1000;

    let timerID = setInterval(() => {

      this.setState({
        seconds: this.formatingNubmers(+this.state.seconds + 1)
      });

      if(+this.state.seconds > 60) {

        this.setState({
          seconds: '01',
          minutes: this.formatingNubmers(+this.state.minutes + 1)
        })
      }

      if(+this.state.minutes > 60) {

        this.setState({
          minutes: '01',
          hours: this.formatingNubmers(+this.state.hours + 1)
        })
      }

    }, timerSpeed);

    return timerID;
  };

  stopTimer = (timerId) => {
    clearInterval(timerId);

    this.setState({
      seconds: this.formatingNubmers(0),
      minutes: this.formatingNubmers(0),
      hours: this.formatingNubmers(0)
    });
  };

  activateTimer = () => {

    this.setState({
      isActive: !this.state.isActive
    });

    if(!this.state.isActive) { // TODO Как правильно проверить состояние после его изменеия ?

      this.setState({
        timerID: this.startTimer()
      });

    } else {
      this.stopTimer(this.state.timerID)
    }
  }
}

export default Timer;