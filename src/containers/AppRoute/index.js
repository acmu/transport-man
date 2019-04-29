import React from 'react';
import { Route, Switch } from 'react-router';

import HomePage from '#components/HomePage';
import UserInfo from '#components/UserInfo';
import OrderList from '#components/OrderList';
import CustomerList from '#components/CustomerList';
import { hot } from 'react-hot-loader/root';

const AppRoute = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/userinfo' component={UserInfo} />
    <Route exact path='/orderlist' component={OrderList} />
    <Route exact path='/customerlist' component={CustomerList} />
    <Route render={() => <h1>We can not find this location.</h1>} />
  </Switch>
);

export default hot(AppRoute);
