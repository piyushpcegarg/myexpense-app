import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import theme from './theme';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import Firebase from './firebase/Firebase';
import { FirebaseProvider } from './firebase/Context';

const MyExpenseApp = () => {

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SnackbarProvider autoHideDuration={3000}>
          <FirebaseProvider value={Firebase}>
            {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </FirebaseProvider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<MyExpenseApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
