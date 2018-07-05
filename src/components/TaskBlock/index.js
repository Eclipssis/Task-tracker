import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from "react-router-dom";
import TaskList from "../TaskList";
import TaskChart from "../TaskChart";
import { Route, Switch } from 'react-router-dom'

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
    value: 0,
  };

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} className={classes.tabsRoot}>
            <Tab label="TASK LOG" component={Link} to='/task_log'/>
            <Tab label="TASKS CHART" component={Link} to='/task_chart'/>
          </Tabs>
        </AppBar>

        <Switch>
          <Route path={'/task_chart'} component={TaskChart}/>
          <Route path={'/' || '/task_log' } component={TaskList}/> // TODO сомнительное решение
        </Switch>

      </div>
    );
  }
}

export default withStyles(styles)(TaskBlock);