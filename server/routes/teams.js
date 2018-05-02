const express = require('express');
const router = express.Router();
const { Team, Player } = require('../../db');

router.get('/', (req, res, next) => {
    let whereObj  = {};
    if(req.query){
        whereObj = req.query;
    }
    Team.findAll({
        where: whereObj
    })
    .then(teams => {
        res.send(teams);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
    Team.create(req.body)
        .then(team => {
            res.status(201).send({
                note: 'team Created!',
                team
            })
        })
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    Team.findById(Number(req.params.id))
        .then(team => {
            res.send(team);
        })
        .catch(next);
})

router.get('/:id/players', (req, res, next) => {
    // Team.findById(Number(req.params.id))
    //     .then(team => {
    //        return team.getPlayers()
    //     })
    //     .then(players => {
    //         res.send(players);
    //     })
    //     .catch(next);

    Team.findOne({
        where: {
            id: Number(req.params.id),
        },
        include: [{model: Player}] 
    })
        .then(team => {
            res.send(team);
        })
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    // Player.update({
    //     where: {
    //         id: Number(req.params.id)
    //     },
    //     values: req.body
    // }) -- This will give you back an array of objects.
    Team.findById(Number(req.params.id))
        .then(team => {
            return team.update(req.body)
        })
        .then(updatedTeam => {
            res.send({
                note: `Team ${req.params.id} has been updated`,
                team: updatedTeam
            })
        })
        .catch(next);
})

router.delete(':id', (req, res, next) => {
    Team.findById(Number(req.params.id))
        .then(team => {
            return team.destroy()
        })
        .then(() => {
            res.send('team destroyed!');
        })
        .catch(next);
})

module.exports = router; 