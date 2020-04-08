import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const expensesReference = db.collection('expenses');

const Firebase = {
  // auth

  // firestore
  getExpenses: () => {

    const expenses = expensesReference.orderBy('date', 'desc');
    return expenses.get({source: "server"});
  },

  createExpense: expenseData => {

    /* Added timestamp field and changed field type of amount to number */
    expenseData.timestamp = firebase.firestore.Timestamp.now();
    expenseData.amount = Number.parseInt(expenseData['amount']);

    return expensesReference.add(expenseData);
  }

};

export default Firebase;
