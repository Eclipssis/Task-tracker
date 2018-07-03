import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { bindActionCreators } from 'redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import onDeleteTask from '../../actions/Task/delete'

function formatTime(date) {
  return date.match(/\d\d:\d\d:\d\d/);
}

class TaskRow extends Component {

  render() {
    const task = this.props.task;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {task.id}
        </TableCell>
        <TableCell>{task.title}</TableCell>
        <TableCell>{formatTime(task.start)}</TableCell>
        <TableCell>{formatTime(task.end)}</TableCell>
        <TableCell>{task.timeSpend}</TableCell>
        <TableCell>
          <Button variant="outlined" component={Link} to={'/task/' + task.id}>
            Info
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="outlined" onClick={() => this.props.onDeleteTask(task.id)} >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({onDeleteTask: onDeleteTask}, dispatch)
}

export default connect(
  null,
  matchDispatchToProps
)(TaskRow);