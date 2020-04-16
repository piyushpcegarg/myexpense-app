import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {FirebaseHOC} from '../firebase/Context';

const PrivateRoute = ({ component: Component, firebaseRef, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => firebaseRef.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/signin' />}
    />
  );
};

export default FirebaseHOC(PrivateRoute);
