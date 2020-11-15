import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Box, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpenseCard from './ExpenseCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import { FirebaseHOC } from '../firebase/Context';

const useStyles = makeStyles((theme) => ({
  expense_list: {
    'background-color': '#f2f2f2',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  box: {
    padding: theme.spacing(16),
  },
}));

const ListExpense = ({ setCreateExpense, firebaseRef }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [expenseList, setExpenseList] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    firebaseRef
      .getExpenses()
      .then((querySnapshot) => {
        setExpenseList(querySnapshot.docs);
      })
      .catch((error) => {
        console.log('Error occurred while fetching expenses: ', error);
        enqueueSnackbar('Error occurred while fetching expenses', {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [enqueueSnackbar, firebaseRef]);

  return (
    <div id="expense_list" className={classes.expense_list}>
      {loading ? (
        <Box display="flex" justifyContent="center" className={classes.box}>
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
          <Container component="main" maxWidth="xs">
            <Grid container>
              {expenseList.map((expense) => (
                <Grid key={expense.id} item xs={12}>
                  <ExpenseCard expense={expense.data()} />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={() => setCreateExpense(true)}
          >
            <AddIcon />
          </Fab>
        </React.Fragment>
      )}
    </div>
  );
};

ListExpense.propTypes = {
  setCreateExpense: PropTypes.func.isRequired,
  firebaseRef: PropTypes.object.isRequired,
};

export default FirebaseHOC(ListExpense);
