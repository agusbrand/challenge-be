'use strict'

const { ProfileRepository } = require('../repositories')
const {
  NoProfessionsFoundError,
  NoBestClientsFoundError,
} = require('../services/errors')

class AdminService {
  static async getBestProfession({ startDate, endDate }) {
    const bestProfessions = await ProfileRepository.getBestProfessions(
      startDate,
      endDate,
    )

    if (!bestProfessions || bestProfessions.length === 0) {
      throw new NoProfessionsFoundError()
    }

    const firstProfession = bestProfessions[0]

    if (firstProfession.get('total') === null) {
      throw new NoProfessionsFoundError()
    }

    return { bestProfession: firstProfession.get('profession') }
  }

  static async getBestClients({ startDate, endDate, limit }) {
    const DEFAULT_LIMIT = 2

    const bestClients = await ProfileRepository.getBestClients(
      startDate,
      endDate,
    )

    if (!bestClients || bestClients.length === 0) {
      throw new NoBestClientsFoundError()
    }

    // Note: The limit parameter was applied using javascript as a workaround
    // to an ongoing issue with the "limit" paramter in Sequelize
    // See: https://github.com/sequelize/sequelize/issues/12971
    return bestClients.slice(0, limit <= DEFAULT_LIMIT ? DEFAULT_LIMIT : limit)
  }
}

module.exports = AdminService
