import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
//import Timer from '../Timer'

function formatTime(date) {

  let ms = Date.parse(date);
  let newDate = new Date(ms);

  return newDate.getFullHours() + ":" + newDate.getFullMinutes() + ":" + newDate.getFullSeconds()
}

const styles = theme => ({
  root: {
    width: 1200,
    overflowX: 'auto',
    margin: '0 auto',
    padding: '0'
  },
  table: {
    minWidth: 700,
  },
});


// let data = localStorage.getItem('tasks');
// data = JSON.parse(data) ? JSON.parse(data) : this.props.taskList;

class TaskList extends Component {

  state = {

  };

  render() {
    const { classes } = this.props;
    const data = this.props.taskList;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Task start</TableCell>
              <TableCell>Task end</TableCell>
              <TableCell>Time spend</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((task, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {task.id}
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{formatTime(task.start)}</TableCell>
                  <TableCell>{formatTime(task.end)}</TableCell>
                  <TableCell>{task.timeSpend}</TableCell>
                  <TableCell>

                    <Button variant="outlined" onClick={this.showTask}>
                      Info
                    </Button>

                  </TableCell>
                  <TableCell>

                    <Button variant="outlined" onClick={() => this.deleteTask(task.id)} >
                      Delete
                    </Button>

                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  showTask = (id) => {
    console.log(id);
  };

  deleteTask = (id) => {
    // console.log(this.props.taskList);
    this.props.onDeleteTask(id);
  };

}


export default withStyles(styles)(connect(
  state => ({
    taskList: state
  }),
  dispatch => ({
    onDeleteTask: (id) => {
      dispatch({ type: 'DELETE_TASK', payload: id})
    }
  })
)(TaskList));