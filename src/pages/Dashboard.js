import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const Dashboard = () => {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Fuel" secondary="Fuel Charges" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Shopping" secondary="Shopping" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Vacation" secondary="Vacations" />
      </ListItem>
    </List>
  );
};

export default Dashboard;
