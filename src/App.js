import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';

const App = () => {
  const history = useHistory();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.replace('/home');
      } else {
        history.replace('/');
      }
    });
  }, [history]);

  return (
    <div id="myexpense-app">
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );
};

export default App;
