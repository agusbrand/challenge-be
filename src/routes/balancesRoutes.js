'use strict'

const express = require('express')
const router = express.Router()

const { depositMoney } = require('../controllers/balancesController')

router.post('/deposit/:userId', depositMoney)

module.exports = router
