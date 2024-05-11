const express = require('express')
const bodyParser = require('body-parser')
const indexRouter = require('./routes')
const app = express()

app.use(bodyParser.json())

// bodyParser.urlencoded is necessary to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }))

app.use(indexRouter)

module.exports = app
