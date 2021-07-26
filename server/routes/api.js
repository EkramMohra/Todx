const express = require('express')
const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = new Sequelize('mysql://root:@localhost/sql_todx')
const router = express.Router()

router.get('/tasks', function (req, res) {

    let todayDate =  moment().format("DD.MM.YYYY",true)

    sequelize
        .query(`SELECT task.* 
                FROM task JOIN list 
                WHERE list.user_id = ${session.id}
                AND list.task_id = task.id
                AND task.date = todayDate
            `)
        .then(function ([result]) {
            res.send(result)
        })
})

router.post('/tasks', function (req, res) {

    let newTask = req.body

    sequelize
    .query(`INSERT INTO 
        task(title,content,date,time,status,favourite,notification)
        VALUES('${newTask.title}','${newTask.content}','${newTask.date}','${newTask.time}',
        '${newTask.status}',${newTask.favourite},'${newTask.notification}'`)
        .then(function ([result]) {
            res.send(result)
        })
})

router.delete('/tasks', function (req, res) {

    let todayDate = new Date()

    sequelize
        .query(`SELECT task.* 
                    FROM task JOIN list 
                    WHERE list.user_id = ${session.id}
                    AND list.task_id = task.id
                    AND task.date = todayDate
                `)
        .then(function ([result]) {
            res.send(result)
        })
})

module.exports = router