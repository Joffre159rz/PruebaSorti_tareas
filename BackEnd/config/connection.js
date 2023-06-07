const { Sequelize } = require('sequelize');
require('dotenv').config();

const host=process.env.DB_HOST
const user=process.env.DB_USERNAME
const database=process.env.DB_NAME
const password=process.env.DB_PASSWORD

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión establecida correctamente');
  
      await sequelize.sync();
      console.log('Modelo sincronizado correctamente');
    } catch (error) {
      console.error('Error al conectar y sincronizar el modelo:', error);
    }
  })();
  
module.exports = sequelize;