'use strict'

const express = require('express')
const router = express.Router()

const { getProfile } = require('../middleware/getProfile')

const contractsRouter = require('./contractsRoutes')
const jobsRouter = require('./jobsRoutes')

// Authenticates all routes using getProfile middleware
router.use(getProfile)

router.use('/contracts', contractsRouter)
router.use('/jobs', jobsRouter)

module.exports = router
