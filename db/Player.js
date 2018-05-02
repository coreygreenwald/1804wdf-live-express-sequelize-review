const db = require('./_db');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const Player = db.define('player', {
    name: Sequelize.STRING,
    number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 99
        },
        // set(){
        //     return this.getDataValue('number') % 100
        // }
    },
    position: {
        type: Sequelize.ENUM('QB', 'RB', 'WR', 'LB', 'DB', 'TE', 'OTE', 'C', 'RESERVE'),
        defaultValue: 'RESERVE'
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    jerseyInfo: {
        type: Sequelize.VIRTUAL,
        get: function(){
            return `${this.getDataValue('name').split(' ')[1]} ${this.getDataValue('number')}`
        }
    }
})

Player.getByPosition = function(position){
    return Player.findAll({
        where: {
            position
        }
    })
}

Player.prototype.getTeammates = function(){
    console.log('we hit this!')
    return Player.findAll({
        where: {
            teamId: this.teamId,
            id: {
                [Op.ne]: this.id
            }
        }
    })
}

Player.addHook('beforeValidate', (instance) => {
    instance.number = instance.number % 100;
})

module.exports = Player;