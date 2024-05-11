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

  static findById(id, options) {
    return Job.findOne({
      where: { id: id },
      ...options,
    })
  }

  static getContract(job, options) {
    return job.getContract(options)
  }

  static setJobAsPaid(job, options) {
    return job.update({ paid: true, paymentDate: new Date() }, options)
  }
}

module.exports = JobRepository
