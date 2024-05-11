'use strict'

const { Profile, Job, Contract, sequelize } = require('../models')
const { Op } = require('sequelize')

class ProfileRepository {
  static findById(id, options) {
    return Profile.findOne({
      where: { id: id },
      ...options,
    })
  }

  static updateBalance(profile, newBalance, options) {
    return profile.update({ balance: newBalance }, options)
  }

  static getBestClients(startDate, endDate) {
    return Profile.scope('clients').findAll({
      attributes: [
        'id',
        [sequelize.literal(`"firstName" || ' ' || "lastName"`), 'fullName'],
        [sequelize.fn('SUM', sequelize.col('Client.Jobs.price')), 'paid'],
      ],
      group: ['Profile.id'],
      order: [[sequelize.col('paid'), 'DESC']],
      include: [
        {
          model: Contract,
          as: 'Client',
          attributes: [],
          include: [
            {
              model: Job.scope('paid'),
              as: 'Jobs',
              attributes: [],
              where: {
                paymentDate: {
                  [Op.gte]: new Date(startDate),
                  [Op.lte]: new Date(endDate),
                },
              },
            },
          ],
        },
      ],
    })
  }

  static getBestProfessions(startDate, endDate) {
    return Profile.scope('contractors').findAll({
      attributes: [
        'profession',
        [sequelize.fn('SUM', sequelize.col('Contractor.Jobs.price')), 'total'],
      ],
      group: ['profession'],
      order: [[sequelize.col('total'), 'DESC']],
      include: [
        {
          model: Contract,
          as: 'Contractor',
          attributes: [],
          include: [
            {
              model: Job.scope('paid'),
              as: 'Jobs',
              attributes: [],
              where: {
                paymentDate: {
                  [Op.gte]: new Date(startDate),
                  [Op.lte]: new Date(endDate),
                },
              },
            },
          ],
        },
      ],
    })
  }
}

module.exports = ProfileRepository
