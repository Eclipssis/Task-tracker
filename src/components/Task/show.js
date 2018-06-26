import React from 'react';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import { Link } from 'react-router-dom'

const TaskDetail = ({ task }) => {

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

  if(task) {
    return (
      <div>
        <h2>{ task.title }</h2>
        <h4>Time start: { task.start }</h4>
        <h4>Time end: { task.end }</h4>
        <h4>Time duration: { task.timeSpend }</h4>
        <Button variant="outlined" component={Link} to={'/'}>
          Back
        </Button>
      </div>
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

  let searchingTask = Object.values(state.tasks).find(function (task) {
    return task.id === Number(ownProps.match.params.id);
  });

  return {
    task: searchingTask
  };
};

export default connect(mapStateToProps)(TaskDetail);