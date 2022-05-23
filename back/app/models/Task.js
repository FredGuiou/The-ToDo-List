const sequelize = require('../database');
const { Model, Sequelize } = require('sequelize');

class Task extends Model {}
Task.init({ 
    name: Sequelize.STRING
 }, {
    sequelize,
    timestamps: false,
    tableName: "tasks" // nom de la table
});

module.exports = Task;
