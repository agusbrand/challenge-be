'use strict'

const ContractService = require('../services/ContractService.js')
const { Contract } = require('../models')

/**
 * FIX ME!
 * @returns contract by id
 */
const getContract = async (req, res) => {
  await ContractService.getContract()

  const { id } = req.params
  const contract = await Contract.findOne({ where: { id } })
  if (!contract) return res.status(404).end()
  res.json(contract)
}

module.exports = { getContract }
