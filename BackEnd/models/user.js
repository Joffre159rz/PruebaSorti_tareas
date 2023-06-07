const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const task = require('./task');
const user = sequelize.define('user', {
  nombre: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});
user.associate = (models) => {
  user.hasMany(models.task, {
    foreignKey: 'id',
  });
};

module.exports = user;
