const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.ROOT,
  process.env.PASSWORD,
  {
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    port: process.env.PORT
  }
);

module.exports = sequelize;