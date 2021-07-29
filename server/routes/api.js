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

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: config.PUSHER.APP_ID,
  key: config.PUSHER.KEY,
  secret: config.PUSHER.SECRET,
  cluster: config.PUSHER.CLUSTER,
  useTLS: true
});


//===========================================
//--------------user routes------------------
//===========================================
router.get("/users", async (request, response) => {
  let { email, password } = request.query

  let queryString = `SELECT * FROM user WHERE email='${email}' AND password='${password}'`

  if (!email && !password)
    queryString = `SELECT * FROM user`

  let users = await sequelize.query(queryString);

  response.send(users[0]);
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
  let { today, userId } = req.query

  sequelize
    .query(
      `SELECT todotask.* 
                FROM todotask JOIN todolist 
                WHERE todolist.user_id = '${userId}'
                AND todolist.todotask_id = todotask.id
                AND todotask.date = '${today}';`
    )
    .then(function ([result]) {
      console.log("done from todo")
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
            VALUES('${newTask.date}',${newTask.userId},'${result}')`
        )
        .then(function ([result]) { });
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
  let data = req.body

  sequelize
    .query(
      ` DELETE FROM todolist 
        WHERE todolist.todotask_id = ${data.taskId}
        AND todolist.user_id = ${data.userId} ; `
    )
    .then(function ([result]) { });
  sequelize.query(
    ` DELETE FROM todotask 
        WHERE id = ${data.taskId}; `
  );

  res.send("oki");
});

router.put("/donetodotasks", function (req, res) {

  let taskId = req.body.data.id

  sequelize
    .query(
      `UPDATE todotask 
        SET status = 'done'
        WHERE id = ${taskId};`
    )
    .then(function ([result]) {
      console.log("updated");
    });

  res.send();
});


//===========================================
//--------------daily routes-----------------
//===========================================

router.get("/dailytasks", function (req, res) {
  let { today, userId } = req.query

  sequelize
    .query(
      `SELECT dailytask.* 
      FROM dailytask JOIN dailylist 
      WHERE dailylist.user_id = '${userId}'
      AND dailylist.dailytask_id = dailytask.id;`
    )
    .then(function ([result]) {
      console.log("done from daily")
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
            VALUES(${newTask.userId},'${result}')`
        )
        .then(function ([result]) { });
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
    .then(function ([result]) {
    });

  res.send();
});

router.delete("/dailytasks", function (req, res) {

  let data = req.body;

  sequelize
    .query(
      ` DELETE FROM dailylist 
        WHERE dailylist.dailytask_id = ${data.taskId}
        AND dailylist.user_id ='${data.userId}' ; `
    )
    .then(function ([result]) { });
  sequelize.query(
    ` DELETE FROM dailytask
          WHERE id = ${data.taskId}; `
  );

  res.send("oki");
});

router.put("/donedailytasks", function (req, res) {


  let taskId = req.body.data.id


  sequelize
    .query(
      `UPDATE dailytask 
        SET status = 'done'
        WHERE id = ${taskId};`
    )
    .then(function ([result]) {
      console.log("updated");
    });

  res.send();
});

//===========================================
//--------------daily routes-----------------
//===========================================

router.get("/timedtasks", function (req, res) {
  let { today, userId } = req.query
  console.log(req.query);
  sequelize
    .query(
      `SELECT timedtask.* 
              FROM timedtask JOIN timedlist 
              WHERE timedlist.user_id = '${userId}'
              AND timedlist.timedtask_id = timedtask.id
              AND timedtask.date = '${today}';`
    )

    .then(function ([result]) {
      console.log("done from timed")
      res.send(result)
    })
})

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
            VALUES('${newTask.date}',${newTask.userId},'${result}')`
        )
        .then(function ([result]) { });
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
  let data = req.body;

  sequelize
    .query(
      ` DELETE FROM timedlist 
        WHERE timedlist.timedtask_id = ${data.taskId}
        AND timedlist.user_id = ${data.userId} ; `
    )
    .then(function ([result]) { });
  sequelize.query(
    ` DELETE FROM timedtask 
        WHERE id = ${data.taskId}; `
  );

  res.send("oki");
});

router.put("/donetimedtasks", function (req, res) {


  let taskId = req.body.data.id
  sequelize
    .query(
      `UPDATE timedtask 
        SET status = 'done'
        WHERE id = ${taskId};`
    )
    .then(function ([result]) {
      console.log("updated");
    });

  res.send();
});


//===========================================

router.get("/newmeeting", (req, res) => {
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
      let data = {
        start_url: response.start_url,
        join_url: response.join_url
      }
      res.send(data);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

//===========================================
//--------------share routes------------------
//===========================================
router.post("/shares", async (request, response) => {
  let data = request.body

  let task_type = (data.task_type === "timedlist") ? "timedtask" : "todotask"

  console.log("zoom: ", data.task_type)
  // if(data.task_type === "timedlist"){
  //   data.task_id = await sequelize.query(`INSERT INTO 
  //       timedtask(title,content,date,time,status)
  //       VALUES('${data.title}','${data.zoom.start_url}','${data.date}'
  //             ,'${data.time}','pending')`)
  //   console.log(data.task_id)
  // }
  let shared = await sequelize.query(
    `INSERT INTO 
     sharedtasks (sender_id,recevier_id,task_id,task_type)
     VALUES('${data.sender_id}','${data.recevier_id}','${data.task_id}'
          ,'${data.task_type}')`
  );

  let userName = await sequelize.query(
    `SELECT first,last from user
          WHERE id = ${data.sender_id}`
  );

  let task = await sequelize.query(
    `SELECT ${task_type}.* from ${task_type} JOIN ${data.task_type}
     WHERE ${data.task_type}.user_id  = ${data.sender_id}
     AND  ${task_type}.id = ${data.task_id}
    `
  );

  console.log(task[0][0])

  let channel = `share_task_recevier_id_${data.recevier_id}`



  pusher.trigger(channel, "my-event", {
    message: `You have a new shared task from ${userName[0][0].first} ${userName[0][0].last}`,
    task: task[0][0]
  });
  response.send("shared");
});


async function zoom() {
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
            VALUES('${newTask.date}',${newTask.userId},'${result}')`
        )
        .then(function ([result]) { });
    });
}

function todo() {

}

module.exports = router;
