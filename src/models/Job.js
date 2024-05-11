'use strict'

const { Model, Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Contract)
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
