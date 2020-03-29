import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import theme from './theme';
import firebase from 'firebase/app';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const MyExpenseApp = () => {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SnackbarProvider autoHideDuration={3000}>
          {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
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
