'use strict'

const { Model, Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.Profile, { as: 'Contractor' })
      Contract.belongsTo(models.Profile, { as: 'Client' })
      Contract.hasMany(models.Job)
    }

    static STATUSES = {
      NEW: 'new',
      IN_PROGRESS: 'in_progress',
      TERMINATED: 'terminated',
    }

    hasProfile(profile) {
      return this.hasClient(profile) || this.hasContractor(profile)
    }

    hasClient(profile) {
      return this.ClientId === profile.id
    }

    hasContractor(profile) {
      return this.ContractorId === profile.id
    }
  }

  Contract.init(
    {
      terms: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          Contract.STATUSES.NEW,
          Contract.STATUSES.IN_PROGRESS,
          Contract.STATUSES.TERMINATED,
        ),
      },
    },
    {
      sequelize,
      modelName: 'Contract',
      scopes: {
        forProfile(profile) {
          return {
            where: {
              [Op.or]: [{ ClientId: profile.id }, { ContractorId: profile.id }],
            },
          }
        },
        nonTerminated: {
          where: {
            status: [Contract.STATUSES.NEW, Contract.STATUSES.IN_PROGRESS],
          },
        },
      },
    },
  )

  return Contract
}
