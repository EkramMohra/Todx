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

  let todayDate = moment().format("YYYY-MM-DD", true);
  console.log(todayDate)

  sequelize
    .query(
      `SELECT task.* 
                FROM task JOIN list 
                WHERE list.user_id = '1'
                AND list.task_id = task.id
                AND task.date = '${todayDate}'
                AND task.status = 'pending';
            `
    )
    .then(function ([result]) {
      res.send(result);
    });
});

router.post("/tasks", function (req, res) {

  let newTask = req.body;

  console.log(newTask.favourite)

  sequelize
    .query(
      `INSERT INTO 
        task(title,content,date,time,status,favourite,notification)
        VALUES('${newTask.title}','${newTask.content}','${newTask.date}','${newTask.time}',
        '${newTask.status}','${newTask.favourite}','${newTask.notification}')`
    )
    .then(function ([result]) {
      sequelize
        .query(
          `INSERT INTO 
          list(date,user_id,task_id)
            VALUES('${newTask.date}','1','${result}')`
        ).then(function ([result]) {
          
        });
    });

  res.send();
});


router.put("/tasks", function (req, res) {

  let updateTask = req.body;

  sequelize
    .query(
      `UPDATE task 
        SET title = '${updateTask.title}',
            content = '${updateTask.content}',
            date = '${updateTask.date}',
            time = '${updateTask.time}',
            status = '${updateTask.status}',
            favourite = ${updateTask.favourite},
            notification = '${updateTask.notification}'
        WHERE id = ${updateTask.id}`
        )
    .then(function ([result]) {
      console.log('mbrok')
    });

  res.send();
});

router.delete("/tasks", function (req, res) {
  
  let taskId = req.body.id
  
  sequelize
    .query(
      ` DELETE FROM list 
        WHERE list.task_id = ${taskId}
        AND list.user_id = '1' ; `).then(function ([result]) {
          
        });
  sequelize
    .query(
      ` DELETE FROM task 
        WHERE id = ${taskId}; `)

    res.send('oki');
  });

module.exports = router;
