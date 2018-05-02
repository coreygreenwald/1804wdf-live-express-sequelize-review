const express = require('express');
const router = express.Router();

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports =  router; 