'use strict'

const { Contract } = require('../models')

class ContractRepository {
  static findById(id, options) {
    return Contract.findOne({
      where: { id: id },
      ...options,
    })
  }

  static getNonTerminatedContractsForProfile(profile) {
    return Contract.scope('nonTerminated', {
      method: ['forProfile', profile],
    }).findAll()
  }
}

module.exports = ContractRepository
