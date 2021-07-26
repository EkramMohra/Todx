// const Sequelize = require('sequelize')
// const moment = require('moment');
// const sequelize = new Sequelize('mysql://root:@localhost/sql_todx')

// let todayDate ='25/07/2021'

//     console.log(todayDate)
// sequelize
//     .query(`SELECT task.* 
//             FROM task JOIN list 
//             WHERE list.user_id = 1
//             AND list.task_id = task.id
//             AND task.date = '${todayDate}';
//         `)
//     .then(function ([result]) {
//         console.log(result)
//     })