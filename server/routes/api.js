const express = require('express')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_todx')
const router = express.Router()



module.exports = router