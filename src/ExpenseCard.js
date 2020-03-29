import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { format } from 'date-fns'
import Categories from './Categories';
import ExpenseModes from './ExpenseModes';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  content: {
    textAlign: 'left',
  }
}));

const ExpenseCard = ({expense}) => {

  const classes = useStyles();
  const mode = ExpenseModes.get(expense.mode);
  const category = Categories.get(expense.category);
  const date = format(new Date(expense.date.seconds * 1000), 'dd/MM/yyyy');

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Box display="flex">
          <Box flexGrow={1} fontSize={12} fontWeight={"bold"}>
            {mode}
          </Box>
          <Box fontSize={12} fontWeight={"bold"}>
            {expense.amount}
          </Box>
        </Box>
        <Box display="flex">
          <Box flexGrow={1} fontSize={12}>
            {category}
          </Box>
          <Box fontSize={12}>
            {date}
          </Box>
        </Box>
        <Divider variant={"middle"}></Divider>
        <Typography variant={"subtitle1"} color={"primary"}>
          {expense.title}
        </Typography>
        <Typography variant={"caption"}>
          {expense.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

ExpenseCard.propTypes = {
  expense: PropTypes.object.isRequired,
}

export default ExpenseCard;
