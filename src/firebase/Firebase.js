import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
console.log('Initialize firebase' + new Date());
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const expensesReference = db.collection('expenses');

const Firebase = {

  isAuthenticated : () => {

    return auth.currentUser !== null;
  },

  // auth
  signIn: (phoneNumber, applicationVerifier) => {

    return auth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
  },

  // firestore
  getExpenses: () => {

    const expenses = expensesReference.orderBy('date', 'desc');
    return expenses.get({source: "server"});
  },

  createExpense: expenseData => {

    /* Added timestamp field */
    expenseData.timestamp = firebase.firestore.Timestamp.now();
    /* Changed field type of amount to number */
    expenseData.amount = Number.parseInt(expenseData['amount']);
    /* Changed field type of date to firestore timestamp */
    expenseData.date = firebase.firestore.Timestamp.fromMillis(
      Date.parse(expenseData.date.toDateString()));

    return expensesReference.add(expenseData);
  }

};

export default Firebase;
