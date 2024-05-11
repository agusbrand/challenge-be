'use strict'

const { Model, Op } = require('sequelize')
const Decimal = require('decimal.js')

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Contract)
    }

    isPaid() {
      return (
        this.paid === true ||
        (this.paymentDate !== null && this.paymentDate !== undefined)
      )
    }

    hasValidPrice() {
      return (
        this.price instanceof Decimal &&
        this.price.greaterThanOrEqualTo(new Decimal(0))
      )
    }
  }

  Job.init(
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        get() {
          const value = this.getDataValue('price')

          if (value === null) {
            return value
          }

          return new Decimal(value)
        },
        set(value) {
          if (value === null) {
            return this.setDataValue('price', value)
          }

          if (!(value instanceof Decimal)) {
            value = new Decimal(value)
          }

          this.setDataValue('price', value.toString())
        },
      },
      paid: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Job',
      scopes: {
        paid: {
          where: {
            paid: true,
          },
        },
        unpaid: {
          where: {
            [Op.or]: [{ paid: false }, { paid: null }],
          },
        },
      },
    },
  )

  return Job
}
