'use strict'

const express = require('express')
const router = express.Router()

const { getUnpaidJobs } = require('../controllers/jobsController')

router.get('/unpaid', getUnpaidJobs)

module.exports = router
