import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import HmrTest from './components/HMR';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <HmrTest />
  </BrowserRouter>,
  document.getElementById('root'),
);
