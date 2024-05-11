'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.Profile, { as: 'Contractor' })
      Contract.belongsTo(models.Profile, { as: 'Client' })
      Contract.hasMany(models.Job)
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
        type: DataTypes.ENUM('new', 'in_progress', 'terminated'),
      },
    },
    {
      sequelize,
      modelName: 'Contract',
    },
  )

  return Contract
}
