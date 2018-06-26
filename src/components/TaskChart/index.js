import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { BarChart, XAxis, YAxis, Bar } from 'recharts';
import {connect} from "react-redux";
import convertDate from '../../services/convertDate'

function randomDate(starHour, endHour, starMinutes, endMinutes) {

  let currentDay = new Date(Date.now()).getDate();
  let date       = new Date(2018, 10, currentDay);
  let hour       = Math.random() * (endHour - starHour) + starHour;
  let minutes    = Math.random() * (endMinutes - starMinutes) + starMinutes;
  date.setHours(hour);
  date.setMinutes(minutes);
  return date;
}



const style = {
  buttonWrap: {
    textAlign: 'right'
  }
};

class TaskChart extends Component {

  generateTask = function generateTask(id,i) {
    let startTime = randomDate(i, i, 0, 10);
    let endTime = randomDate(i, i + 2, 20, 30);

    // TODO refactore SROCHNO
    let taskDuration = Date.parse(endTime) - Date.parse(startTime);
    taskDuration /= 1000;

    let seconds = Math.round(taskDuration % 60);
    if(seconds < 10) {
      seconds = '0' + seconds
    }

    taskDuration = Math.floor(taskDuration / 60);
    let minutes = Math.round(taskDuration % 60);
    if(minutes < 10) {
      minutes = '0' + minutes
    }

    taskDuration = Math.floor(taskDuration / 60);
    let hours = Math.round(taskDuration % 24);
    if(hours < 10) {
      hours = '0' + hours
    }

    let totalTimeSpend =  hours + ':' + minutes + ':' + seconds;

    return {
      id: id,
      title: 'Task - ' + id,
      start: convertDate(startTime),
      end: convertDate(endTime),
      timeSpend: totalTimeSpend
    };
  };

  generateDummyData = () => {
    let taskCount = Math.random() * (15 - 10) + 10;
    let dummyData = [];
    let id = 1;
    let counter = 0;

    for (let i = 0; i < taskCount; i++) {
      dummyData.push(this.generateTask(id,counter));
      counter += 2;
      id++
    }

    this.props.onGenerateTasks(dummyData)
  };

  // TODO should be refactor
  getChartData = () => {
    let hash = [];

    for (let i = 0; i < 24; i++) {
      hash[i] = {
        hours: String(i),
        minutes: 0
      };
    }

    let store = Object.values(this.props.store.tasks);
    let currentDay = new Date().getDate();

    let lastDayTasks = [];
    for (let i = store.length - 1; i >= 0; i--) {
      let startTime = store[i].start.match(/\d+/g);
      let startDay = startTime[0];

      if(+startDay === currentDay) lastDayTasks.push(store[i]);
    }

    lastDayTasks.forEach(task => {
      let startTime = task.start.match(/\d+/g);
      let endTime = task.end.match(/\d+/g);

      let startHour = +startTime[3];
      let startMinute = +startTime[4];
      let startSecond = +startTime[5] / 60;

      let endHour = +endTime[3];
      let endMinute = +endTime[4];
      let endSecond = +endTime[5] / 60;

      if(startHour === endHour) {
        hash[startHour].minutes += (endMinute - startMinute) + (endSecond - startSecond);
      }

      if(startHour + 1 === endHour) { // TODO черная магия :(
        hash[startHour].minutes += (60 - +startMinute) + (endSecond - startSecond);
        hash[endHour].minutes = endMinute + endSecond;
      }

      if(startHour + 1 < endHour) { // TODO черная магия :(
        let differenceHours = endHour - (startHour + 1); // TODO черная магия :(

        hash[startHour].minutes += (60 - +startMinute) ;
        hash[endHour].minutes = endMinute + endSecond;

        for (let i = 0; i < differenceHours; i++) {
          hash[startHour + 1 + i].minutes = 60; // TODO черная магия :(
        }
      }
    });

    return hash
  };

  render() {
    let chartData = this.getChartData();

    return (
      <div>
        <BarChart width={1200} height={350} data={chartData} style={{ marginTop: 25 }}>
          <XAxis dataKey="hours" />
          <YAxis />
          <Bar type="monotone" dataKey="minutes" barSize={25} fill="#3248c7" />

        </BarChart>

        <div style={style.buttonWrap}>
          <Button variant="outlined" onClick={this.generateDummyData}>
            Generate tasks
          </Button>
        </div>

      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onGenerateTasks: (taskList) => {
      dispatch({ type: 'GENERATE_TASKS', payload: taskList})
    }
  })
)(TaskChart);

