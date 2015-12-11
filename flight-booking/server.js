'use strict';

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = process.env.PORT || 1337;
process.env.JSON_PATH = __dirname + '/data';
app.use(express.static(__dirname + '/', {etag: false}));
app.use(bodyParser.json());
app.use('/flight', require('./api/flight'))

try {
    app.listen(port);
    console.log('server started on http://localhost:1337/');
} catch (e) {
    console.log('could not start server on 1337 port', e);
}