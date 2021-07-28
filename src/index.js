import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToDoList } from './Stores/Todo/ToDoList'
import { DailyList } from './Stores/Daily/DailyList'
import { TimedList } from './Stores/TimedList/TimedList'


let todolist = new ToDoList()
todolist.getList()

let dailylist = new DailyList()
dailylist.getList()

let timedlist = new TimedList()
timedlist.getList()

const stores = {
  todolist: todolist,
  dailylist: dailylist,
  timedlist: timedlist
}

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
