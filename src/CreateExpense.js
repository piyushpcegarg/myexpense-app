import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Categories from './Categories';
import ExpenseModes from './ExpenseModes';
import MenuItem from '@material-ui/core/MenuItem';
import {DatePicker} from '@material-ui/pickers';
import { useForm, Controller } from 'react-hook-form';
import firebase from 'firebase/app';
import 'firebase/firestore';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateExpense = ({setCreateExpense, showSnackBar}) => {

  const { register, handleSubmit, setValue, errors, control } = useForm();
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    register({ name: "date" });
    setValue("date", firebase.firestore.Timestamp.fromMillis(Date.parse(date.toDateString())));
  }, );

  const onSubmit = data => {

    /* Added timestamp field and changed field type of amount to number */
    data.timestamp = firebase.firestore.Timestamp.now();
    data.amount = Number.parseInt(data['amount']);

    const db = firebase.firestore();
    const expensesReference = db.collection('expenses');

    expensesReference.add(data)
      .then((doc) => {
        showSnackBar('Saved Successfully', 'success');
      })
      .catch((error) => {
        showSnackBar('Some error occurred', 'error');
      })
      .finally(() => setCreateExpense(false));
  };

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'select category' }}
              defaultValue=''
              as={
                <TextField
                  variant="outlined"
                  select
                  required
                  fullWidth
                  label="Category"
                  error={!!errors.category}
                  helperText={errors?.category?.message}
                >
                  {<MenuItem value=''>None</MenuItem>}
                  {Array.from(Categories.entries()).map(entry => (
                    <MenuItem key={entry[0]} value={entry[0]}>
                      {entry[1]}
                    </MenuItem>
                  ))}
                </TextField>
              }
            >
            </Controller>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="title"
              label="Title"
              inputRef={register({
                required: 'title is required',
                minLength: {value: 5, message: 'minimum 5 characters required'},
                maxLength: {value: 100, message: 'maximum 100 characters allowed'}
              })}
              error={!!errors.title}
              helperText={errors?.title?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              required
              fullWidth
              name="date"
              label="Date"
              value={date}
              onChange={(val) => {
                setDate(val);
                setValue("date", firebase.firestore.Timestamp.fromMillis(Date.parse(val.toDateString())));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              InputProps={{
                inputProps: {
                  'min' : '0',
                  'max' : '999999'
                },
              }}
              inputRef={register({
                required: 'amount is required',
                min: {value: 0, message: 'amount should be positive'},
                max: {value: 999999, message: 'exceeded maximum amount limit'}
              })}
              error={!!errors.amount}
              helperText={errors?.amount?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mode"
              control={control}
              rules={{ required: 'select mode' }}
              defaultValue=''
              as={
                <TextField
                  variant="outlined"
                  select
                  required
                  fullWidth
                  label="Mode"
                  error={!!errors.mode}
                  helperText={errors?.mode?.message}
                >
                  {<MenuItem value=''>None</MenuItem>}
                  {Array.from(ExpenseModes.entries()).map(entry => (
                    <MenuItem key={entry[0]} value={entry[0]}>
                      {entry[1]}
                    </MenuItem>
                  ))}
                </TextField>
              }
            >
            </Controller>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              rows="3"
              fullWidth
              name="description"
              label="Description"
              inputRef={register}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
        >
          Create Expense
        </Button>
      </form>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
        onClick={() => setCreateExpense(false)}
      >
        Close
      </Button>
    </Container>
  );
};

CreateExpense.propTypes = {
  setCreateExpense: PropTypes.func.isRequired,
  showSnackBar: PropTypes.func.isRequired,
}

export default CreateExpense;
