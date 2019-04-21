import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '#flux/root/reducer';

import App from './components/App';
import HmrTest from '#components/HMR';
import ReduxDemo from '#components/reduxDemo/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <HmrTest />
      <ReduxDemo />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
