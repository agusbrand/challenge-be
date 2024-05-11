'use strict'

const { JobRepository } = require('../repositories')

class JobsService {
  static async getUnpaidJobsForProfile({ profile }) {
    return await JobRepository.getUnpaidJobsForProfile(profile)
  }
}

module.exports = JobsService
