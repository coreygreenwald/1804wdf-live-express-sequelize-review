const express = require('express');
const router = express.Router();
const { Player } = require('../../db');

router.get('/', (req, res, next) => {
    let whereObj  = {};
    if(req.query){
        whereObj = req.query;
    }
    Player.findAll({
        where: whereObj
    })
    .then(players => {
        res.send(players);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
    console.log('we made it!');
    Player.create(req.body)
        .then(player => {
            res.status(201).send({
                note: 'Player Created!',
                player
            })
        })
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    Player.findById(Number(req.params.id))
        .then(player => {
            res.send(player);
        })
        .catch(next);
})

router.get('/:id/teammates', (req, res, next) => {
    Player.findById(Number(req.params.id))
        .then(player => {
            return player.getTeammates()
        })
        .then(teammates => {
            res.send(teammates); 
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
    Player.findById(Number(req.params.id))
        .then(player => {
            return player.update(req.body)
        })
        .then(updatedPlayer => {
            res.send({
                note: `Player ${req.params.id} has been updated`,
                player: updatedPlayer
            })
        })
        .catch(next);
})

router.delete(':id', (req, res, next) => {
    Player.findById(Number(req.params.id))
        .then(player => {
            return player.destroy()
        })
        .then(() => {
            res.send('player destroyed!');
        })
        .catch(next);
})



module.exports =  router; 