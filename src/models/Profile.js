'use strict'

const { Model } = require('sequelize')
const Decimal = require('decimal.js')

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

    static TYPES = {
      CLIENT: 'client',
      CONTRACTOR: 'contractor',
    }

    isClient() {
      return this.type === Profile.TYPES.CLIENT
    }

    hasSufficientBalanceToPayAmount(amountToPay) {
      return this.balance.greaterThanOrEqualTo(amountToPay)
    }

    hasValidBalance() {
      return (
        this.balance !== null &&
        this.balance !== undefined &&
        this.balance instanceof Decimal &&
        this.balance.greaterThanOrEqualTo(new Decimal(0))
      )
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
        get() {
          const value = this.getDataValue('balance')

          if (value === null || value === undefined) {
            return value
          }

          return new Decimal(value)
        },
        set(value) {
          if (value === null || value === undefined) {
            return this.setDataValue('balance', value)
          }

          if (!(value instanceof Decimal)) {
            value = new Decimal(value)
          }

          this.setDataValue('balance', value.toString())
        },
      },
      type: {
        type: DataTypes.ENUM(Profile.TYPES.CLIENT, Profile.TYPES.CONTRACTOR),
      },
    },
    {
      sequelize: sequelize,
      modelName: 'Profile',
    },
  )

  return Profile
}
