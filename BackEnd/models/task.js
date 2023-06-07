const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const task = sequelize.define('task', {
  titulo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false
  }
});
module.exports = task;
