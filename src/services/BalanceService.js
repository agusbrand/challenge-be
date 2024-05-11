'use strict'

const Decimal = require('decimal.js')
const { Transaction } = require('sequelize')
const { sequelize } = require('../models')
const { ProfileRepository, JobRepository } = require('../repositories')
const {
  ResourceNotFoundError,
  ForbiddenError,
  InvalidAmountError,
  DepositAmountError,
} = require('./errors')

class BalanceService {
  static async depositMoney({ profile, clientId, depositAmount }) {
    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      },
      async (t) => {
        const transactionOptions = { transaction: t }

        const lockOptions = {
          ...transactionOptions,
          lock: Transaction.LOCK.UPDATE,
        }

        if (profile.id !== clientId) {
          throw new ForbiddenError(
            'Deposit money into other users is not allowed',
          )
        }

        const client = await ProfileRepository.findById(clientId, lockOptions)

        if (client === null) {
          throw new ResourceNotFoundError('Client')
        }

        if (!client.isClient(client)) {
          throw new ForbiddenError('Only clients can deposit money')
        }

        if (
          !(
            client.hasValidBalance() &&
            client.isDepositAmountValid(depositAmount)
          )
        ) {
          throw new InvalidAmountError()
        }

        const unpaidJobs = await JobRepository.getUnpaidJobsForProfile(
          client,
          lockOptions,
        )

        const totalAmountToPay = unpaidJobs.reduce((total, job) => {
          return total.add(job.price)
        }, new Decimal(0))

        const twentyFivePercentOfTotal = totalAmountToPay.mul(
          new Decimal('0.25'),
        )

        if (depositAmount.greaterThan(twentyFivePercentOfTotal)) {
          throw new DepositAmountError()
        }

        return await ProfileRepository.updateBalance(
          client,
          client.balance.plus(depositAmount),
          transactionOptions,
        )
      },
    )
  }
}

module.exports = BalanceService
