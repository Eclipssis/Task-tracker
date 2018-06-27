import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { BarChart, XAxis, YAxis, Bar } from 'recharts';
import {connect} from "react-redux";
import createTask from '../../helpers/createTask'

function randomDate(starHour, endHour, starMinutes, endMinutes) {

  let currentDay = new Date().getDate();
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

  generateDummyData = () => {
    let dummyData = [];
    let minTasks = 10;
    let maxTasks = 15;
    let counter = 0;
    let taskCount = Math.random() * (maxTasks - minTasks) + minTasks;

    for (let i = 1; i < taskCount + 1; i++) {

      let taskTitle = 'Task title - ' + i;
      let startTime = randomDate(counter, counter, 0, 10);
      let endTime = randomDate(counter, counter + 2, 20, 30);

      let dummyTask = createTask(i, taskTitle, startTime, endTime);
      dummyData.push(dummyTask);
      counter += 2;
    }

    this.props.onGenerateTasks(dummyData)
  };

  createTimeColumn = (hash, start, end) => {

    let nextHour = start.hour + 1;

    if(start.hour === end.hour) {
      hash[start.hour].minutes += (end.minute - start.minute) + (end.second - start.second);
    }

    if(nextHour === end.hour) {
      hash[start.hour].minutes += (60 - +start.minute) + (end.second - start.second);
      hash[end.hour].minutes = end.minute + end.second;
    }

    if(nextHour < end.hour) {
      let differenceHours = end.hour - (nextHour);

      hash[start.hour].minutes += (60 - +start.minute) ;
      hash[end.hour].minutes = end.minute + end.second;

      for (let i = 0; i < differenceHours; i++) {
        hash[nextHour + i].minutes = 60;
      }
    }
  };

  getChartData = () => {
    let hash = [];
    let lastDayTasks = [];
    let store = Object.values(this.props.store.tasks);
    let currentDay = new Date().getDate();

    for (let i = 0; i < 24; i++) {
      hash[i] = {
        hours: String(i),
        minutes: 0
      };
    }

    for (let i = store.length - 1; i >= 0; i--) {
      let startTime = store[i].start.match(/\d+/g);
      let startDay = startTime[0];

      if(+startDay === currentDay) lastDayTasks.push(store[i]);
    }

    lastDayTasks.forEach(task => {
      let startTime = task.start.match(/\d+/g);
      let endTime = task.end.match(/\d+/g);

      let start = {
        hour: +startTime[3],
        minute: +startTime[4],
        second: +startTime[5] / 60
      };

      let end = {
        hour: +endTime[3],
        minute: +endTime[4],
        second: +endTime[5] / 60
      };

      this.createTimeColumn(hash, start, end)
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

