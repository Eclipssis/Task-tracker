import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

import TaskList from "../TaskList";
import TaskChart from "../TaskChart";

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

class TaskBlock extends Component {

  state = {
    value: this.props.tabContainer,
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
            <Tab label="TASK LOG" component={Link} to={'/task_log'}/>
            <Tab label="TASKS CHART" component={Link} to={'/task_chart'}/>
          </Tabs>
        </AppBar>

        {value === 0 &&
        <TabContainer>
          <TaskList/>
        </TabContainer>}

        {value === 1 &&
        <TabContainer>
          <TaskChart />
        </TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(TaskBlock);