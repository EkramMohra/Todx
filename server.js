//express module
const express = require('express')
const path = require('path')
const api = require('./server/routes/api')

const app = express()

app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/',api)

const port = 3005
app.listen(port, function () {
    console.log("server is listening on port " + port)
})

