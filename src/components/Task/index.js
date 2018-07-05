import React from 'react';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './index.css'

const style = {
  error: {
    display: 'inline-block',
    marginBottom: 15,
    borderRadius: 5,
    boxShadow: '0px 2px 5px #D43A55',
    color: '#ffffff',
    backgroundColor: '#ff415c',
    fontSize: 28,
    padding: 15,
  },
  errorContainer: {
    textAlign: 'center'
  }
};

const TaskDetail = ({ task }) => {

  if(task) {
    return (
      <Paper className={'task-paper'} >
        <Typography variant="display2" component="h2" gutterBottom>{ task.title }</Typography>
        <Typography variant="subheading" component="p" gutterBottom>
          Time start: <Typography variant="headline" component="span" gutterBottom> { task.start }</Typography>
        </Typography>

        <Typography variant="subheading" component="p" gutterBottom>
          Time end: <Typography variant="headline" component="span" gutterBottom> { task.end }</Typography>
        </Typography>

        <Typography variant="subheading" component="p" gutterBottom>
          Time duration: <Typography variant="headline" component="span" gutterBottom> { task.timeSpend }</Typography>
        </Typography>

        <Button variant="outlined" color="primary" component={Link} to={'/'}>
          Back
        </Button>

      </Paper>
    )
  } else {
    return (
      <h3 style={style.errorContainer}>
        <span style={style.error}>Task is not found</span>
        <div>
          <Button variant="outlined" component={Link} to={'/'}>
            Back home
          </Button>
        </div>
      </h3>
    )
  }
};

const mapStateToProps = (state, ownProps) => {

  let searchingTask = state.tasks.taskList.find(function (task) {
    return task.id === Number(ownProps.match.params.id);
  });

  return {
    task: searchingTask
  };
};

export default connect(mapStateToProps)(TaskDetail);