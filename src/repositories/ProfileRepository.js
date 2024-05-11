'use strict'

const { Profile } = require('../models')

class ProfileRepository {
  static findById(id, options) {
    return Profile.findOne({
      where: { id: id },
      ...options,
    })
  }

  static updateBalance(profile, newBalance, options) {
    return profile.update({ balance: newBalance }, options)
  }
}

module.exports = ProfileRepository
