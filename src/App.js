import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Expense from './Expense';
import Dashboard from './Dashboard';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontStyle: 'italic'
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="outlined" color="inherit" className={classes.button}>Sign up</Button>
          <Typography variant="h6" className={classes.title} align="center">
            MyExpense
          </Typography>
          <Button variant="outlined" color="inherit" className={classes.button}>Sign in</Button>
        </Toolbar>
      </AppBar>
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<MoneyIcon />} label="EXPENSES" />
          <Tab icon={<DashboardIcon />} label="DASHBOARD" />
        </Tabs>
      </Paper>
      {value === 0 ? <Expense /> : <Dashboard />}
    </div>
  );
}

export default App;
