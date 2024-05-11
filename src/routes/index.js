'use strict'

const express = require('express')
const router = express.Router()

const contractsRouter = require('./contractsRoutes.js')

router.use('/contracts', contractsRouter)

module.exports = router
