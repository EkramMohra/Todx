const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/sql_todx");
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

module.exports = router;
