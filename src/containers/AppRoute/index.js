import React from 'react';
import { Route, Switch } from 'react-router';

import HomePage from '#components/HomePage';
import SignIn from '#components/SignIn';
import HmrTest from '#components/HMR';
import ReduxDemo from '#components/reduxDemo/App';
import { hot } from 'react-hot-loader/root';

const TestFunc = () => (
  <div>
    <HmrTest />
    <ReduxDemo />
    <p>sdfsdfs</p>
  </div>
);

const AppRoute = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/signin' component={SignIn} />
    <Route exact path='/test' component={TestFunc} />
    <Route render={() => <h1>We can not find this location.</h1>} />
  </Switch>
);

export default hot(AppRoute);
