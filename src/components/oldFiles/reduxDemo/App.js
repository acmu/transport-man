import React from 'react';
import Footer from './Footer';
import AddTodo from '#containers/reduxDemo/AddTodo';
import VisibleTodoList from '#containers/reduxDemo/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
