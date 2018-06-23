import React from 'react';
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TaskList from "../TaskList";
import { BarChart, CustomAxisTick, XAxis, YAxis, Bar, CustomBarLabel } from 'recharts';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 1200,
    margin: '25px auto',
  },
  tabsRoot: {
    backgroundColor: '#01bcd5',
  }
});

const data = [
  { axisX: '1', minutes: 45 },
  { axisX: '2', minutes: 15 },
  { axisX: '3', minutes: 5 },
  { axisX: '4', minutes: 25 },
  { axisX: '5', minutes: 30 },
  { axisX: '6', minutes: 35 },
  { axisX: '7', minutes: 10 },
  { axisX: '8', minutes: 20 },
  { axisX: '9', minutes: 10 },
  { axisX: '11', minutes: 15 },
  { axisX: '12', minutes: 25 },
  { axisX: '13', minutes: 35 },
  { axisX: '14', minutes: 10 },
  { axisX: '15', minutes: 12 },
  { axisX: '16', minutes: 17 },
  { axisX: '17', minutes: 24 },
  { axisX: '18', minutes: 32 },
  { axisX: '19', minutes: 23 },
  { axisX: '20', minutes: 21 },
  { axisX: '21', minutes: 52 },
  { axisX: '22', minutes: 57 },
  { axisX: '23', minutes: 45 },
];

class TaskBlock extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className={classes.tabsRoot}>
            <Tab label="TASK LOG" />
            <Tab label="TASKS CHART" href="#basic-tabs"/>
          </Tabs>
        </AppBar>

        {value === 0 &&
        <TabContainer>
          <TaskList/>
        </TabContainer>}

        {value === 1 &&
        <TabContainer>
          <BarChart width={1200} height={350} data={data} style={{ marginTop: 25 }}>
            <XAxis dataKey="axisX" />
            <YAxis />
            <Bar type="monotone" dataKey="minutes" barSize={25} fill="#3248c7" />
          </BarChart>
        </TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(TaskBlock);