import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react'
import App from './App';
import reportWebVitals from './reportWebVitals';

import Task from './Stores/Task'
import { List } from './Stores/List'

// let info1 = {
//   id : 1,
//   title :'buy food',
//   content : 'buy some veggies and milk',
//   time : '11/08/2021',
//   date : null,
//   notification : 'pending',
//   status : 1,
//   favourite : 0
// }
// let info2 = {
//   id : 2,
//   title :'write code',
//   content : 'do some routes',
//   time : '02/08/2021',
//   date : null,
//   notification : 'pending',
//   status : 1,
//   favourite : 0
// }

// let task1 = new Task(info1)
// let task2 = new Task(info2)

let list = new List()
list.getList()

const stores = {
  list: list,
}

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
