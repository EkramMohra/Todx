const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/sql_todx");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("./config");
const rp = require("request-promise");

const router = express.Router();

const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, config.APISecret);
//===========================================
//--------------user routes------------------
//===========================================
router.get("/users", async (request, response) => {
  let { email, password } = request.query;

  let user = await sequelize.query(
    `SELECT * FROM user WHERE email='${email}' AND password='${password}'`
  );
  response.send(user[0]);
});

router.post("/users", async (request, response) => {
  const user = { ...request.body.user };
  sequelize.query(
    `INSERT INTO 
      user
      VALUES( null,'${user.last}','${user.first}',
            '${user.email}','${user.password}',null,null)`
  );
  console.log(user);
  response.send(user);
});

//============================================
//--------------todo routes-------------------
//============================================
router.get("/todotasks", function (req, res) {
  let todayDate = moment().format("YYYY-MM-DD", true);

  sequelize
    .query(
      `SELECT todotask.* 
                FROM todotask JOIN todolist 
                WHERE todolist.user_id = '1'
                AND todolist.todotask_id = todotask.id
                AND todotask.date = '${todayDate}'
                AND todotask.status = 'pending';`
    )
    .then(function ([result]) {
      res.send(result);
    });
});

router.post("/todotasks", function (req, res) {
  let newTask = req.body;

  sequelize
    .query(
      `INSERT INTO 
        todotask(title,content,date,priority,status)
        VALUES('${newTask.title}','${newTask.content}','${newTask.date}',
               '${newTask.priority}','${newTask.status}')`
    )
    .then(function ([result]) {
      sequelize
        .query(
          `INSERT INTO 
          todolist(date,user_id,todotask_id)
            VALUES('${newTask.date}','1','${result}')`
        )
        .then(function ([result]) {});
    });

  res.send();
});

router.put("/todotasks", function (req, res) {
  let updateTask = req.body;

  sequelize
    .query(
      `UPDATE todotask 
        SET title = '${updateTask.title}',
            content = '${updateTask.content}',
            date = '${updateTask.date}',
            priority = ${updateTask.priority},
            status = '${updateTask.status}'
        WHERE id = ${updateTask.id};`
    )
    .then(function ([result]) {
      console.log("updated");
    });

  res.send();
});

router.delete("/todotasks", function (req, res) {
  let taskId = req.body.id;

  console.log(taskId);

  sequelize
    .query(
      ` DELETE FROM todolist 
        WHERE todolist.todotask_id = ${taskId}
        AND todolist.user_id = '1' ; `
    )
    .then(function ([result]) {});
  sequelize.query(
    ` DELETE FROM todotask 
        WHERE id = ${taskId}; `
  );

  res.send("oki");
});

//===========================================
//--------------daily routes-----------------
//===========================================

router.get("/dailytasks", function (req, res) {
  sequelize
    .query(
      `SELECT dailytask.* 
                FROM dailytask JOIN dailylist 
                WHERE dailylist.user_id = '1'
                AND dailylist.dailytask_id = dailytask.id
                AND dailytask.status = 'pending';`
    )
    .then(function ([result]) {
      res.send(result);
    });
});

router.post("/dailytasks", function (req, res) {
  let newTask = req.body;

  sequelize
    .query(
      `INSERT INTO 
        dailytask(title,content,status)
        VALUES('${newTask.title}','${newTask.content}','${newTask.status}')`
    )
    .then(function ([result]) {
      sequelize
        .query(
          `INSERT INTO 
          dailylist(user_id,dailytask_id)
            VALUES('1','${result}')`
        )
        .then(function ([result]) {});
    });

  res.send();
});

router.put("/dailytasks", function (req, res) {
  let updateTask = req.body;

  sequelize
    .query(
      `UPDATE dailytask 
        SET title = '${updateTask.title}',
            content = '${updateTask.content}',
            status = '${updateTask.status}'
        WHERE id = ${updateTask.id};`
    )
    .then(function ([result]) {});

  res.send();
});

router.delete("/dailytasks", function (req, res) {
  let taskId = req.body.id;

  sequelize
    .query(
      ` DELETE FROM dailylist 
        WHERE dailylist.dailytask_id = ${taskId}
        AND dailylist.user_id = '1' ; `
    )
    .then(function ([result]) {});
  sequelize.query(
    ` DELETE FROM dailytask 
        WHERE id = ${taskId}; `
  );

  res.send("oki");
});

//===========================================
//--------------daily routes-----------------
//===========================================

router.get("/timedtasks", function (req, res) {
  let todayDate = moment().format("YYYY-MM-DD", true);
  console.log(todayDate);
  sequelize
    .query(
      `SELECT timedtask.* 
                FROM timedtask JOIN timedlist 
                WHERE timedlist.user_id = '1'
                AND timedlist.timedtask_id = timedtask.id
                AND timedtask.date = '${todayDate}'
                AND timedtask.status = 'pending';`
    )
    .then(function ([result]) {
      res.send(result);
    });
});

router.post("/timedtasks", function (req, res) {
  let newTask = req.body;

  sequelize
    .query(
      `INSERT INTO 
        timedtask(title,content,date,time,notification,status)
        VALUES('${newTask.title}','${newTask.content}','${newTask.date}'
              ,'${newTask.time}',${newTask.notification},'${newTask.status}')`
    )
    .then(function ([result]) {
      sequelize
        .query(
          `INSERT INTO 
          timedlist(date,user_id,timedtask_id)
            VALUES('${newTask.date}','1','${result}')`
        )
        .then(function ([result]) {});
    });

  res.send();
});

router.put("/timedtasks", function (req, res) {
  let updateTask = req.body;

  sequelize
    .query(
      `UPDATE timedtask 
        SET title = '${updateTask.title}',
            content = '${updateTask.content}',
            date = '${updateTask.date}',
            time = '${updateTask.time}',
            notification = ${updateTask.notification},
            status = '${updateTask.status}'
        WHERE id = ${updateTask.id};`
    )
    .then(function ([result]) {
      console.log("updated");
    });

  res.send();
});

router.delete("/timedtasks", function (req, res) {
  let taskId = req.body.id;

  console.log(taskId);

  sequelize
    .query(
      ` DELETE FROM timedlist 
        WHERE timedlist.timedtask_id = ${taskId}
        AND timedlist.user_id = '1' ; `
    )
    .then(function ([result]) {});
  sequelize.query(
    ` DELETE FROM timedtask 
        WHERE id = ${taskId}; `
  );

  res.send("oki");
});

//===========================================

router.post("/newmeeting", (req, res) => {
  let options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/me/meetings",
    body: {
      topic: req.query.title,
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.send(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});
//===========================================

module.exports = router;
