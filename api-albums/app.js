'use strict'

var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

var album_routes = require('./routes/album');
var image_routes = require('./routes/image');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cabeceras
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');

    next();
});

//Rutas base
app.use('/api', album_routes);
app.use('/api', image_routes);


module.exports = app;