const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/sql_todx");
const moment = require("moment");
const router = express.Router();

router.get("/users", async (req, res) => {
  let email = req.query.email;
  let password = req.query.password;
  //check if email/password are in db ==> sends the name of the user
  res.send("username");
});

router.post("/users", async (req, res) => {
  const user = { ...req.body.user };
  // insert user opject into db -- { username: 'khaleel', email: 'khaleel.ke@gmail.com', password: '123' }
  console.log(user);
  res.end();
});

router.get("/tasks", function (req, res) {
  let todayDate = moment().format("DD.MM.YYYY", true);

  sequelize
    .query(
      `SELECT task.* 
                FROM task JOIN list 
                WHERE list.user_id = ${session.id}
                AND list.task_id = task.id
                AND task.date = todayDate
            `
    )
    .then(function ([result]) {
      res.send(result);
    });
});

router.post("/tasks", function (req, res) {
  let newTask = req.body;

  sequelize
    .query(
      `INSERT INTO 
        task(title,content,date,time,status,favourite,notification)
        VALUES('${newTask.title}','${newTask.content}','${newTask.date}','${newTask.time}',
        '${newTask.status}',${newTask.favourite},'${newTask.notification}'`
    )
    .then(function ([result]) {
      res.send(result);
    });
});

router.delete("/tasks", function (req, res) {
  let todayDate = new Date();

  sequelize
    .query(
      `SELECT task.* 
                    FROM task JOIN list 
                    WHERE list.user_id = ${session.id}
                    AND list.task_id = task.id
                    AND task.date = todayDate
                `
    )
    .then(function ([result]) {
      res.send(result);
    });
});

module.exports = router;
