import React from 'react';
import ListExpense from './ListExpense';
import CreateExpense from './CreateExpense';
import { useSnackbar } from 'notistack';

const Expense = () => {
  const [createExpense, setCreateExpense] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const showSnackBar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  return (
    <div id="expense">
      {createExpense ? (
        <CreateExpense
          setCreateExpense={setCreateExpense}
          showSnackBar={showSnackBar}
        />
      ) : (
        <ListExpense setCreateExpense={setCreateExpense} />
      )}
    </div>
  );
};

export default Expense;
