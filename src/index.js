import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToDoList } from './Stores/Todo/ToDoList'
import { DailyList } from './Stores/Daily/DailyList'
import { TimedList } from './Stores/TimedList/TimedList'
let stores = {
  todolist: new ToDoList(),
  dailylist: new DailyList(),
  timedlist: new TimedList()
}
ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();