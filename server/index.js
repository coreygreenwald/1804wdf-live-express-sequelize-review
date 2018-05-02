const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

// const someCodeCoreyWrote = require('../randomMiddleware');

app.use(morgan('dev'));

app.use(bodyParser.json());

// app.use(someCodeCoreyWrote);

const apiRouter = require('./routes');

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('welcome home!');
})
/*
    PUT OUR ROUTING MIDDLEWARE HERE
*/ 

app.use((err, req, res, next) => {
    res.status(404).send('NOT FOUND!');
})

module.exports = app;
