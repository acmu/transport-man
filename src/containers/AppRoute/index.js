import React from 'react';
import { Route, Switch } from 'react-router';

import Content from '#components/Content';
import SignIn from '#components/SignIn';
import { hot } from 'react-hot-loader/root';

const AppRoute = () => (
  <Switch>
    <Route exact path='/' component={Content} />
    <Route exact path='/signin' component={SignIn} />
    <Route render={() => <h1>We can not find this location.</h1>} />
  </Switch>
);

export default hot(AppRoute);
