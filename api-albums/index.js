'use strict'
var mongoose = require('mongoose');
var app      = require('./app');

mongoose.connect('mongodb://localhost:27017/albums', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Database server running...');
    }
    app.listen(3765, function() {
            console.log('App listening on port: 3765');
    });
});