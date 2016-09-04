var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');




// /* Get all State */
router.get('/getstates', function(req, res, next) {
	var States = mongoose.model('States', StatesSchema);
	States.find(function(err, states) {
	  if (err) return console.error(err);
	  // console.dir(movies);
	  res.send(states);
	});
	
});


/* Get single State */
router.get('/getStatesById', function(req, res, next) {
	
	//get bus station ID from parameter
	state_id = req.query.state_id;
		
	var States = mongoose.model('States', StatesSchema);
	States.findOne({'_id':state_id},function(err, states) {
	  if (err) return console.error(err);
	  res.send(states);
	});
	
});


module.exports = router;
