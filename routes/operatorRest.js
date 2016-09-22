var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



//add bus station
router.post('/Operator', function(req, res, next){

	var OperatorObject = req.body;


	//Add Bus Station
	 var operatorSchema = mongoose.model('operators', OperatorSchema);
	 var OperatorModel = new operatorSchema(OperatorObject);

		// res.setHeader("Content-Type", "text/plain");

				//Check if email exist
				operatorSchema.count({email:req.body.email}, function(err, num_operators){
						if(err) return "Error Detected";
						
						if(num_operators > 0){
							res.end("Duplicate ");
							process.exit(1);
							// return false;
						}

					});


				//Check if email exist
				operatorSchema.count({phone:req.body.phone}, function(err, num_operators){
						if(err) return "Error Detected";
						
						if(num_operators > 0){
							res.end("Duplicate ");
							process.exit(1);
							// return false;
						}

					});


	
				//Save the BUS Stateion
				OperatorModel.save(function(err, operator) {
				  if (err) {
						res.end("Error in Perfoming operation");
						}else{
						res.end("Success");
					}

				});
});


//update bus station
router.put('/Operator', function(req, res, next){


	 var Operator = mongoose.model('operators', OperatorSchema);
	 // var BusStation = new BStation(BusStationObject);

		Operator.findOneAndUpdate({_id:req.body._id}, req.body, function (err, response) {
		  res.send("Sucesss");
		});
});

router.delete('/Operator',function(req,res){
	
	//get bus station ID from parameter
	operator_id = req.query.operator_id;

	//get bus station schema
	 var operator = mongoose.model('operators', OperatorSchema);
	//remove the bus station
	operator.remove({ _id: operator_id }, function(err) {
	    if (!err) {
	  		//if no error.. then it is successfull
	        res.send("Success");
	    }
	    
	});



});


//Get Single bus station
router.get('/Operator',function(req,res, next){


	//get bus station ID from parameter
	operator_id = req.query.operator_id;

	 var Operator = mongoose.model('operators', OperatorSchema);
	 Operator.find({'_id' : operator_id },function(err, operators){
	 	res.send(operators);
	 });
});

//Get all bus statation
router.get('/getAllOperator',function(req,res, next){

	 var operator = mongoose.model('operators', OperatorSchema);
	 operator.find({},function(err, operators){
	 	res.send(operators);
	 });
});

/* Get single State */
router.get('/getOpertaorById', function(req, res, next) {
	
	//get bus station ID from parameter
	station_id = req.query.station_id;
		
	var BusStation = mongoose.model('Bus_Station', BusStationSchema);
	BusStation.findOne({'_id':station_id},function(err, stations) {
	  if (err) return console.error(err);
	  res.send(stations);
	});
	
});



module.exports = router;
