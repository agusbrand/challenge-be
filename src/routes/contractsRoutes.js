'use strict'

const express = require('express')
const router = express.Router()

const {
  getContract,
  getContracts,
} = require('../controllers/contractsController.js')

router.get('/:id', getContract)
router.get('/', getContracts)

module.exports = router
