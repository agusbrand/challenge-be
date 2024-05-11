'use strict'

const { Transaction } = require('sequelize')
const { sequelize } = require('../models')
const {
  JobRepository,
  ProfileRepository,
  ContractRepository,
} = require('../repositories')
const {
  ForbiddenError,
  JobAlreadyPaidError,
  InvalidAmountError,
  InsufficientBalanceError,
  ResourceNotFoundError,
} = require('./errors')

class JobsService {
  static async getUnpaidJobsForProfile({ profile }) {
    return await JobRepository.getUnpaidJobsForProfile(profile)
  }

  static async payJob({ clientId, jobId }) {
    return await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      },
      async (t) => {
        const transactionOptions = { transaction: t }

        const lockOptions = {
          ...transactionOptions,
          lock: Transaction.LOCK.UPDATE,
        }

        const client = await ProfileRepository.findById(clientId, lockOptions)

        if (client === null) {
          throw new ResourceNotFoundError('Client')
        }

        const job = await JobRepository.findById(jobId, lockOptions)

        if (job === null) {
          throw new ResourceNotFoundError('Job')
        }

        if (!client.isClient()) {
          throw new ForbiddenError('Only clients can pay for a job')
        }

        const contract = await JobRepository.getContract(job, lockOptions)

        if (!contract.hasClient(client)) {
          throw new ForbiddenError("You can't pay a jobs from other clients")
        }

        if (job.isPaid()) {
          throw new JobAlreadyPaidError()
        }

        const contractor = await ContractRepository.getContractor(
          contract,
          lockOptions,
        )

        if (
          !(
            contractor.hasValidBalance() &&
            client.hasValidBalance() &&
            job.hasValidPrice()
          )
        ) {
          throw new InvalidAmountError()
        }

        const jobPrice = job.price

        if (!client.hasSufficientBalanceToPayAmount(jobPrice)) {
          throw new InsufficientBalanceError()
        }

        await ProfileRepository.updateBalance(
          client,
          client.balance.minus(jobPrice),
          transactionOptions,
        )

        await ProfileRepository.updateBalance(
          contractor,
          contractor.balance.plus(jobPrice),
          transactionOptions,
        )

        const paidJob = await JobRepository.setJobAsPaid(
          job,
          transactionOptions,
        )

        return paidJob
      },
    )
  }
}

module.exports = JobsService
