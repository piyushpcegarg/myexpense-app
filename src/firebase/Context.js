import React from 'react';

const FirebaseContext = React.createContext({});

export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

/**
 * Firebase Higher order component which takes any component
 * and adds firebase as a property in the component
 * @param Component
 * @returns {function(*): *}
 * @constructor
 */
export const FirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebaseRef={state} />}
  </FirebaseConsumer>
);
