// const Sequelize = require('sequelize')
// const moment = require('moment');
// const sequelize = new Sequelize('mysql://root:@localhost/sql_todx')

// let newTask = {
//   title: "abc",
//   content: "efg",
//   date: "25/07/20201",
//   time: "13:00",
//   status: "pending",
//   notification: "on",
//   favourite: 0
// }

// console.log(newTask.title)

// sequelize
//   .query(
//     `INSERT INTO 
//       task(title,content,date,time,status,favourite,notification)
//       VALUES('${newTask.title}','${newTask.content}','${newTask.date}','${newTask.time}',
//       '${newTask.status}',${newTask.favourite},'${newTask.notification}')`
//       )
//   .then(function ([result]) {
//     console.log(result);
//   });

// let date = 'Thu Aug 10 2021 00:00:00 GMT+0300 (Israel Daylight Time)'

// const changeFormatDate = (string) => {

//   string = string.split(" ");
//   var stringArray = new Array();
//   for (var i = 0; i < string.length; i++) {
//     stringArray.push(string[i]);
//     if (i != string.length - 1) {
//       stringArray.push(" ");
//     }
//   }

//   let month = {
//      'Jan': '01',
//      'Feb': '02',
//      'Mar': '03',
//      'Apr': '04',
//      'May': '05',
//      'Jun': '06',
//      'Jul': '07',
//      'Aug': '08',
//      'Sep': '09',
//      'Oct': '10',
//      'Nov': '11',
//      'Dec': '12',
//   }
//   return `${stringArray[6]}-${month[stringArray[2]]}-${stringArray[4]}`
// }

// console.log(changeFormatDate(date)
// )
// console.log(moment().format("DD", true)-1)


// let fullName = 'ALaa Damouny'

// let firstName = fullName.split(' ').slice(0, -1).join(' ');
// let lastName = fullName.split(' ').slice(-1).join(' ');

// console.log(firstName)