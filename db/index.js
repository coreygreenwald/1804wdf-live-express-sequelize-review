const db = require('./_db');

const Player = require('./Player');
const Team = require('./Team');

Player.belongsTo(Team);
Team.hasMany(Player); //THIS MAKES NO CHANGES TO OUR DB. This gives us team.addPlayer

// Player.belongsToMany(Team, {through: 'Team_History'});
// Team.belongsToMany(Player, {through: 'Team_History'});

module.exports = {
    db,
    Player,
    Team
}