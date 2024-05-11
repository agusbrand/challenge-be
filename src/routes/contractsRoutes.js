'use strict'

const express = require('express')
const router = express.Router()

const { getContract } = require('../controllers/contractsController.js')

router.get('/:id', getContract)

module.exports = router
