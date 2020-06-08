import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontStyle: 'italic',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.button}
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
          <Typography variant="h6" className={classes.title} align="center">
            MyExpense
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.button}
            component={Link}
            to="/signin"
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LandingPage;
