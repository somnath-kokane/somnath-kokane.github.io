
var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var router = express.Router();

var JSON_PATH = process.env.JSON_PATH;

router.get('/listing', function(req, res){
    res.send(fs.readFileSync(JSON_PATH + '/flight/listing.json'))
});

module.exports = router;