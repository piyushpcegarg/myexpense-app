import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import PrivateRoute from './navigation/PrivateRoute';
import Home from './pages/Home';

const App = () => {

  return (
    <div id="myexpense-app">
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignUp} />
        <PrivateRoute path='/home' component={Home} />
      </Switch>
    </div>
  );
};

export default App;
