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
import { Link } from 'react-router-dom'


function formatTime(date) {
  return date.match(/\d\d:\d\d:\d\d/);
}

const styles = () => ({
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

class TaskList extends Component {

  deleteTask = (id) => {
    this.props.onDeleteTask(id);
  };

  render() {
    const { classes } = this.props;
    const data = Object.values(this.props.store.tasks);

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
                  <TableCell>{formatTime(task.timeSpend)}</TableCell>
                  <TableCell>
                    <Button variant="outlined" component={Link} to={'/task/' + task.id}>
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
}

export default withStyles(styles)(connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onDeleteTask: (id) => {
      dispatch({ type: 'DELETE_TASK', payload: id})
    }
  })
)(TaskList));


