 const { Sequelize } = require('sequelize');

 const sequelize = new Sequelize(process.env.PG_URL);
 
 module.exports = sequelize;
