'use strict'

const AdminService = require('../services/AdminService.js')
const { validateDate } = require('../utils')
const {
  NoProfessionsFoundError,
  NoBestClientsFoundError,
} = require('../services/errors')

const getBestProfession = async (req, res) => {
  try {
    const startDate = validateDate(req.query.start)
    const endDate = validateDate(req.query.end)

    const bestProfession = await AdminService.getBestProfession({
      startDate,
      endDate,
    })

    res.status(200).send(bestProfession)
  } catch (error) {
    if (error instanceof NoProfessionsFoundError) {
      res.status(404).send(error.message)
    } else {
      res.status(500).end()
    }
  }
}

const getBestClients = async (req, res) => {
  try {
    const startDate = validateDate(req.query.start)
    const endDate = validateDate(req.query.end)
    const limit = parseInt(req.query.limit) || 0

    const bestClients = await AdminService.getBestClients({
      startDate,
      endDate,
      limit,
    })

    res.status(200).send(bestClients)
  } catch (error) {
    if (error instanceof NoBestClientsFoundError) {
      res.status(404).send(error.message)
    } else {
      res.status(500).end()
    }
  }
}

module.exports = { getBestProfession, getBestClients }
