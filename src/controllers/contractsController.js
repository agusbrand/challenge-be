'use strict'

const ContractService = require('../services/ContractService.js')
const { ResourceNotFoundError, ForbiddenError } = require('../services/errors')

const getContract = async (req, res) => {
  try {
    const profile = req.profile
    const contractId = parseInt(req.params.id) || 0

    if (!contractId) {
      return res.status(400).end()
    }

    const contract = await ContractService.getContractForProfileById({
      profile,
      contractId,
    })

    res.status(200).json(contract)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      res.status(404).send(error.message)
    } else if (error instanceof ForbiddenError) {
      res.status(403).send(error.message)
    } else {
      res.status(500).end()
    }
  }
}

const getContracts = async (req, res) => {
  try {
    const profile = req.profile

    const contracts = await ContractService.getNonTerminatedContractsForProfile(
      { profile },
    )

    res.status(200).json(contracts)
  } catch {
    res.status(500).end()
  }
}

module.exports = { getContract, getContracts }
