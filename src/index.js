import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '#flux/root';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import AppRoute from '#containers/AppRoute';

const store = createStore(
  rootReducer /* preloadedState, */,
  // redux 浏览器扩展
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root'),
);
