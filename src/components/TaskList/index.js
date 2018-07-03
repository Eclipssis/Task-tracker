import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import TaskRow from "../TaskRow";

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
    const data = this.props.store.tasks;

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
                <TaskRow task={task} index={index} key={index} />
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
  })
)(TaskList));


