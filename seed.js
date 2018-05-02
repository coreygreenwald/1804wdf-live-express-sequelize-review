const { db, Player, Team } = require('./db'); 

const promiseForPlayers = Promise.all([
    Player.create({
    name: 'Leveon Bell',
    number: 26,
    position: 'RB'
}), Player.create({
    name: 'Antonio Brown',
    number: 84,
    position: 'WR'
}), Player.create({
    name: 'Ben Roethisburger',
    number: 7,
    position: 'QB'
})])

const promiseForTeams = Promise.all([
    Team.create({
        name: 'Steelers',
        city: 'Pittsburgh'
    }),
    Team.create({
        name: 'Eagles',
        city: 'Philidelphia'
    })
]);

Promise.all([promiseForPlayers, promiseForTeams])
    .then(([[player1, player2, player3], allTeams]) => {
        console.log(allTeams[Math.floor(Math.random() * allTeams.length)]);
        return Promise.all([
            player1.setTeam(allTeams[Math.floor(Math.random() * allTeams.length)]),
            player2.setTeam(allTeams[Math.floor(Math.random() * allTeams.length)]),
            player3.setTeam(allTeams[Math.floor(Math.random() * allTeams.length)])
        ])
    })
    .catch((err) => {
        console.log(err);
    })

