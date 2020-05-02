import React from 'react';
import LandingPage from '../pages/LandingPage';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const routes = [
  { name: 'Landing Page', path: '/', exact: true, component: () => <LandingPage /> },
  { name: 'Sign Up', path: '/signup', exact: false, component: () => <SignUp /> },
  { name: 'Sign In', path: '/signin', exact: false, component: () => <SignUp /> },
  { name: 'Sign In', path: '/home', exact: false, component: () => <Home /> }
];

export default routes;
