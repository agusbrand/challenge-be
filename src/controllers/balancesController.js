'use strict'

const Decimal = require('decimal.js')
const BalanceService = require('../services/BalanceService')
const {
  ResourceNotFoundError,
  ForbiddenError,
  InvalidAmountError,
  DepositAmountError,
} = require('../services/errors')

const depositMoney = async (req, res) => {
  try {
    const profile = req.profile
    const clientId = parseInt(req.params.userId) || 0
    const depositAmount = new Decimal(req.body.depositAmount)

    if (!depositAmount || !clientId) {
      return res.status(400).end()
    }

    await BalanceService.depositMoney({
      profile,
      clientId,
      depositAmount,
    })

    res.status(200).end()
  } catch (error) {
    if (
      error instanceof InvalidAmountError ||
      error instanceof DepositAmountError
    ) {
      res.status(400).send(error.message)
    } else if (error instanceof ResourceNotFoundError) {
      res.status(404).send(error.message)
    } else if (error instanceof ForbiddenError) {
      res.status(403).send(error.message)
    } else {
      res.status(500).end()
    }
  }
}

module.exports = { depositMoney }
