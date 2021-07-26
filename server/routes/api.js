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

module.exports = router;
