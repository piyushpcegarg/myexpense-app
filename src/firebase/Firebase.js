import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const expensesReference = db.collection('expenses');

const Firebase = {
  // auth
  signIn: (phoneNumber, applicationVerifier) => {
    return auth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
  },

  signOut: () => {
    auth.signOut().then(() => console.log('User has logged out successfully.'));
  },

  // firestore
  getExpenses: () => {
    const expenses = expensesReference
      .where('uid', '==', auth.currentUser.uid)
      .orderBy('date', 'desc');
    return expenses.get({ source: 'server' });
  },

  createExpense: (expenseData) => {
    /* Added timestamp field */
    expenseData.timestamp = firebase.firestore.Timestamp.now();
    /* Changed field type of amount to number */
    expenseData.amount = Number.parseInt(expenseData['amount']);
    /* Changed field type of date to firestore timestamp */
    expenseData.date = firebase.firestore.Timestamp.fromMillis(
      Date.parse(expenseData.date.toDateString())
    );
    expenseData.uid = auth.currentUser.uid;

    return expensesReference.add(expenseData);
  },
};

export default Firebase;
