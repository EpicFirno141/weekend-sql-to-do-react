import {useState} from 'react';
import './App.css';
import Header from '../Header/Header';
import TodoList from '../Todo/TodoList';

function App () {
  
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );

}

export default App
