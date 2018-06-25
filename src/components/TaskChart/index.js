import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, Bar } from 'recharts';
import {connect} from "react-redux";

class TaskChart extends Component {

  // TODO should be refactor
  getChartData = () => {
    let hash = [];

    for (let i = 0; i < 24; i++) {
      hash[i] = {
        hours: String(i),
        minutes: 0
      };
    }

    let store = this.props.store;
    let currentDay = new Date().getDate();

    let lastDayTasks = [];
    for (let i = store.length - 1; i >= 0; i--) {
      let startTime = store[i].start.match(/\d+/g);
      let startDay = startTime[0];

      if(+startDay === currentDay) lastDayTasks.push(store[i]);
    }

    lastDayTasks.forEach(task => { // TODO todo
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
      <BarChart width={1200} height={350} data={chartData} style={{ marginTop: 25 }}>
        <XAxis dataKey="hours" />
        <YAxis />
        <Bar type="monotone" dataKey="minutes" barSize={25} fill="#3248c7" />
      </BarChart>
    );
  }
}



export default connect(
  state => ({
    store: state
  })
)(TaskChart);

