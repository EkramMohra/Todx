const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:1234@localhost/sql_todx");
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

router.get("/users", async (request, response) => {
  let {email, password} = request.query

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


router.get("/tasks", function (request, response) {
  let todayDate = moment().format("YYYY-MM-DD", true);
  console.log(todayDate);

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
      response.send(result);
    });
});

router.post("/tasks", function (request, response) {
  let newTask = request.body;

  console.log(newTask.favourite);

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
        )
        .then(function ([result]) {});
    });

    response.send();
});

router.put("/tasks", function (request, response) {
  let updateTask = request.body;

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
      console.log("mbrok");
    });

    response.send();
});

router.post("/newmeeting", (request, response) => {
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
router.delete("/tasks", function (req, res) {
  let taskId = req.body.id;

  sequelize
    .query(
      ` DELETE FROM list 
        WHERE list.task_id = ${taskId}
        AND list.user_id = '1' ; `
    )
    .then(function ([result]) {});
  sequelize.query(
    ` DELETE FROM task 
        WHERE id = ${taskId}; `
  );

  response.send("oki");
});

module.exports = router;
