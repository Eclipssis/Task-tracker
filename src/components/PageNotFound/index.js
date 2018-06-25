import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const PageNotFound = ({ location }) => (
  <div>
    <h3>
      Page <code>{location.pathname}</code> not found
    </h3>
    <Button variant="outlined" component={Link} to={'/'}>
      Back
    </Button>
  </div>
);

export default (PageNotFound);
