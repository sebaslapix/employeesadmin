const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DB_NAME, 'postgres', process.env.PG_ADMIN_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
});

module.exports = sequelize;