var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



//add bus station
router.post('/Bus', function(req, res, next){

	var BusObject = req.body;


	 var BusModel = new BusAutomobile(BusObject);

		
				//Save the BUS Stateion
				BusModel.save(function(err, operator) {
				  if (err) {
						res.end("Error in Perfoming operation");
						}else{
						res.end("Success");
					}

				});
});


//update bus station
router.put('/Bus', function(req, res, next){

	BusAutomobile.findOneAndUpdate({_id:req.body._id}, req.body, function (err, response) {
		  res.send("Sucesss");
		});
});

router.delete('/Bus',function(req,res){
	
	//get bus station ID from parameter
	bus_id = req.query.bus_id;


	//remove the bus station
	BusAutomobile.remove({ _id: bus_id }, function(err) {
	    if (!err) {
	  		//if no error.. then it is successfull
	        res.send("Success");
	    }
	    
	});



});


//Get Single bus station
router.get('/Bus',function(req,res, next){


	//get bus station ID from parameter
	bus_id = req.query.bus_id;

	 BusAutomobile.find({'_id' : bus_id },function(err, operators){
	 	res.send(operators);
	 });
});

//Get all bus statation
router.get('/getAllBus',function(req,res, next){

	BusAutomobile.find({},function(err, bus){
	 	console.log(err);
	 	res.send(bus);
	 });
});



module.exports = router;
