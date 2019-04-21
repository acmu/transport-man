// import React, { Component } from 'react';

import React from 'react';
import Button from '@material-ui/core/Button';

import AppRoute from '#components/Route';
import Tem from '#components/Tem';

function App() {
  return (
    <div>
      <AppRoute />
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Tem />
    </div>
  );
}

export default App;
