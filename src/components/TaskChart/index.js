import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { BarChart, XAxis, YAxis, Bar } from 'recharts';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import generateTask from "../../actions/Task/generate";

const MIN_IN_HOUR = 60;

const style = {
  buttonWrap: {
    textAlign: 'right'
  }
};

class TaskChart extends Component {

  createTimeColumn = (hash, start, end) => {

    if(start.hour === end.hour) {
      hash[start.hour].minutes += (end.minutes - start.minutes) + (end.seconds - start.seconds);
    } else {
      for (let i = start.hour; i < end.hour; i++) {
        switch (i) {
          case start.hour:
            hash[start.hour].minutes += (MIN_IN_HOUR - +start.minutes);
            hash[end.hour].minutes = end.minutes + end.seconds;
            break;

          case end.hour:
            hash[start.hour].minutes += (MIN_IN_HOUR - +start.minutes);
            hash[end.hour].minutes = end.minutes + end.seconds;
            break;

          default:
            hash[start.hour + i].minutes = MIN_IN_HOUR;
        }
      }
    }
  };

  getChartData = () => {
    let hash = [];
    let lastDayTasks = [];
    let store = this.props.store.tasks;
    let currentDay = new Date().getDate();

    // Create empty chart data
    for (let i = 0; i < 24; i++) {
      hash[i] = {
        hours: String(i),
        minutes: 0
      };
    }

    // Find last day tasks
    for (let i = store.length - 1; i >= 0; i--) {
      let startTime = store[i].start.match(/\d+/g);
      let startDay = startTime[0];

      if(+startDay === currentDay) lastDayTasks.push(store[i]);
    }

    // create chart data
    lastDayTasks.forEach(task => {

      let startTime = task.start.match(/\d+/g);
      let endTime = task.end.match(/\d+/g);

      let start = {
        hour: +startTime[3],
        minutes: +startTime[4],
        seconds: +startTime[5] / 60
      };

      let end = {
        hour: +endTime[3],
        minutes: +endTime[4],
        seconds: +endTime[5] / 60
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
          <Button variant="outlined" onClick={this.props.generateTask}>
            Generate tasks
          </Button>
        </div>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({generateTask: generateTask}, dispatch)
}

export default connect(
  state => ({
    store: state
  }),
  matchDispatchToProps
)(TaskChart);

