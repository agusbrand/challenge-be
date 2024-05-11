'use strict'

const JobService = require('../services/JobService')
const {
  ForbiddenError,
  JobAlreadyPaidError,
  InvalidAmountError,
  InsufficientBalanceError,
  ResourceNotFoundError,
} = require('../services/errors')

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

const payJob = async (req, res) => {
  try {
    const profile = req.profile
    const jobId = parseInt(req.params.job_id) || 0

    if (!jobId) {
      return res.status(400).end()
    }

    const contracts = await JobService.payJob({
      clientId: profile.id,
      jobId: jobId,
    })

    res.status(200).json(contracts)
  } catch (error) {
    if (
      error instanceof JobAlreadyPaidError ||
      error instanceof InvalidAmountError ||
      error instanceof InsufficientBalanceError
    ) {
      res.status(400).send(error.message)
    } else if (error instanceof ForbiddenError) {
      res.status(403).send(error.message)
    } else if (error instanceof ResourceNotFoundError) {
      res.status(404).send(error.message)
    } else {
      res.status(500).end()
    }
  }
}

module.exports = { getUnpaidJobs, payJob }
