import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToDoList } from './Stores/Todo/ToDoList'
import { DailyList } from './Stores/Daily/DailyList'
import { TimedList } from './Stores/TimedList/TimedList'
const moment = require("moment");
let list = []
let stores = {
  todolist: { list },
  dailylist: { list },
  timedlist: { list }
}
const init =  () => {
  if (sessionStorage.getItem("user")) {
    
    let todolist = new ToDoList()
    todolist.getList(moment().format("YYYY-MM-DD", true))

    let dailylist = new DailyList()
    dailylist.getList(moment().format("YYYY-MM-DD", true))

    let timedlist = new TimedList()
    timedlist.getList(moment().format("YYYY-MM-DD", true))

    stores = {
      todolist: todolist,
      dailylist: dailylist,
      timedlist: timedlist
    }
  }
}
init()

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
