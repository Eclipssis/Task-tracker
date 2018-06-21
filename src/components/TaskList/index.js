import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
//import Timer from '../Timer'

function formatTime(date) {

  let ms = Date.parse(date);
  let newDate = new Date(ms);

  return newDate.getFullHours() + ":" + newDate.getFullMinutes() + ":" + newDate.getFullSeconds()
}

const styles = theme => ({
  root: {
    width: 1200,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: '0 auto'
  },
  table: {
    minWidth: 700,
  },
});

// let id = 0;
// function createData(title, start, end, timeSpend) {
//   id += 1;
//   return {id, title, start, end, timeSpend };
// }

// const data = [
//   createData('Create timer', '11:32:10', '12:32:15', '01:00:05', 4.0),
//   createData('Add tasks to app', '01:15:15', '01:30:35', '00:15:25', 4.3),
// ];

let data = localStorage.getItem('tasks');
data = JSON.parse(data) ? JSON.parse(data) : [];

class TaskList extends Component {

  state = {

  };

  render() {
    const { classes } = this.props;
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
            {data.map(task => {
              return (
                <TableRow key={task.id}>
                  <TableCell component="th" scope="row">
                    {task.id + 1}
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

                    <Button variant="outlined" onClick={this.deleteTask}>
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

  showTask = () => {

  };

  deleteTask = () => {

  };

}

export default withStyles(styles)(TaskList);