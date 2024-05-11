'use strict'

const { Job, Contract } = require('../models')

class JobRepository {
  static getUnpaidJobsForProfile(profile, options) {
    return Job.scope('unpaid').findAll({
      include: [
        {
          model: Contract.scope('active', {
            method: ['forProfile', profile],
          }),
          attributes: [],
        },
      ],
      ...options,
    })
  }
}

module.exports = JobRepository
