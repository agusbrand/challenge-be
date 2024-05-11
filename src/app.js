const express = require('express')
const bodyParser = require('body-parser')
const indexRouter = require('./routes')

const app = express()
app.use(bodyParser.json())

app.use(indexRouter)

module.exports = app
