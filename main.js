const { db } = require('./db'); 
// const db = require('./db').db;

const app = require('./server');

db.sync()
    .then(() => {
        app.listen(3000);
    })

