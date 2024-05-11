'use strict'

const { Contract } = require('../models')

class ContractRepository {
  static findById(id, options) {
    return Contract.findOne({
      where: { id: id },
      ...options,
    })
  }
}

module.exports = ContractRepository
