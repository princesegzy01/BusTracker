var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



//add bus station
router.post('/Tracker', function(req, res, next){

	var TrackerObject = req.body;


	 var TrackerModel = new Tracker(TrackerObject);

		
				//Save the BUS Stateion
				TrackerModel.save(function(err, operator) {
				  if (err) {
						res.end("Error in Perfoming operation");
						}else{
						res.end("Success");
					}

				});
});


//update bus station
router.put('/Tracker', function(req, res, next){

	Tracker.findOneAndUpdate({_id:req.body._id}, req.body, function (err, response) {
		  res.send("Sucesss");
		});
});

router.delete('/Tracker',function(req,res){
	
	//get bus station ID from parameter
	tracker_id = req.query.tracker_id;


	//remove the bus station
	Tracker.remove({ _id: tracker_id }, function(err) {
	    if (!err) {
	  		//if no error.. then it is successfull
	        res.send("Success");
	    }
	    
	});



});


//Get Single bus station
router.get('/Tracker',function(req,res, next){


	//get bus station ID from parameter
	tracker_id = req.query.tracker_id;

	 Tracker.find({'_id' : tracker_id },function(err, operators){
	 	res.send(operators);
	 });
});

//Get all bus statation
router.get('/getAllTracker',function(req,res, next){

	Tracker.find({},function(err, bus){
	 	console.log(err);
	 	res.send(bus);
	 });
});



module.exports = router;
