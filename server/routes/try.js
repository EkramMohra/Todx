const Sequelize = require('sequelize')
const moment = require('moment');
const sequelize = new Sequelize('mysql://root:@localhost/sql_todx')

let newTask = {
  title: "abc",
  content: "efg",
  date: "25/07/20201",
  time: "13:00",
  status: "pending",
  notification: "on",
  favourite: 0
}

console.log(newTask.title)

sequelize
  .query(
    `INSERT INTO 
      task(title,content,date,time,status,favourite,notification)
      VALUES('${newTask.title}','${newTask.content}','${newTask.date}','${newTask.time}',
      '${newTask.status}',${newTask.favourite},'${newTask.notification}')`
      )
  .then(function ([result]) {
    console.log(result);
  });