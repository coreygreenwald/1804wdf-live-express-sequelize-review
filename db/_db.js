const Sequelize = require('sequelize');

const db = new Sequelize(`postgres://localhost:5432/1804_express_sequelize_review`, {logging: false});

module.exports = db;
