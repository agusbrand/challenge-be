'use strict'

const express = require('express')
const router = express.Router()

const { getProfile } = require('../middleware/getProfile')

const contractsRouter = require('./contractsRoutes')
const jobsRouter = require('./jobsRoutes')
const balancesRouter = require('./balancesRoutes')
const adminsRouter = require('./adminsRoutes')

// Authenticates all routes using getProfile middleware
router.use(getProfile)

router.use('/contracts', contractsRouter)
router.use('/jobs', jobsRouter)
router.use('/balances', balancesRouter)
router.use('/admin', adminsRouter)

module.exports = router
