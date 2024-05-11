'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Contract, {
        as: 'Contractor',
        foreignKey: 'ContractorId',
      })

      Profile.hasMany(models.Contract, {
        as: 'Client',
        foreignKey: 'ClientId',
      })
    }
  }

  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(12, 2),
      },
      type: {
        type: DataTypes.ENUM('client', 'contractor'),
      },
    },
    {
      sequelize: sequelize,
      modelName: 'Profile',
    },
  )

  return Profile
}
