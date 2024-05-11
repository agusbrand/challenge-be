'use strict'

const JobService = require('../services/JobService')

const getUnpaidJobs = async (req, res) => {
  try {
    const profile = req.profile

    const contracts = await JobService.getUnpaidJobsForProfile({
      profile,
    })

    res.status(200).json(contracts)
  } catch {
    res.status(500).end()
  }
}

module.exports = { getUnpaidJobs }
