import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '#flux/root/reducer';

import AppRoute from '#containers/AppRoute';

const store = createStore(
  rootReducer /* preloadedState, */,
  // 暂时停止 redux 扩展
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
