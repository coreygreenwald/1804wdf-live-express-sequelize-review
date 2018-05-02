const db = require('./_db');
const Sequelize = require('sequelize');

const Team = db.define('team', {
   name: {
       type: Sequelize.STRING,
       unique: true,
       allowNull: false,
       validate: {
           notEmpty: true
       }
   },
   city: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: true
       }
   }
})

module.exports = Team;