'use strict'
const { ContractRepository } = require('../repositories')
const { ResourceNotFoundError, ForbiddenError } = require('./errors')

class ContractService {
  static async getContractForProfileById({ profile, contractId }) {
    const contract = await ContractRepository.findById(contractId)

    if (contract === null) {
      throw new ResourceNotFoundError('Contract')
    }

    if (!contract.hasProfile(profile)) {
      throw new ForbiddenError()
    }

    return contract
  }
}

module.exports = ContractService
