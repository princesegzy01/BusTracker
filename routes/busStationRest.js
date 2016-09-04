var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



//add bus station
router.post('/BusStation', function(req, res, next){

	var BusStationObject = req.body;


	//Add Bus Station
	 var BStation = mongoose.model('Bus_Station', BusStationSchema);
	 var BusStation = new BStation(BusStationObject);

		// res.setHeader("Content-Type", "text/plain");


		//check if cordinate exist
		BStation.count({longitude:req.body.longitude,latitude:req.body.latitude}, function(err, num_station){
			if(err) return "Error Detected";
			
			if(num_station > 0){
				res.end("Duplicate ");
			}else{


				//Save the BUS Stateion
				BusStation.save(function(err, BusStation) {
				  if (err) {
						res.end("Error in Perfoming operation");
						}else{
						res.end("Success");
					}

				});

			}
			
		});

});


//update bus station
router.put('/BusStation', function(req, res, next){


	// var BusStationObject = req.body;


	//Add Bus Station
	 var BStation = mongoose.model('Bus_Station', BusStationSchema);
	 // var BusStation = new BStation(BusStationObject);

		BStation.findOneAndUpdate({_id:req.body._id}, req.body, function (err, response) {
		  res.send("Sucesss");
		});
			
		//Update the BUS Station
		// BusStation.update(function(err, BusStation) {
		//   if (err) {
		// 		res.end("Error in Perfoming operation");
		// 		}else{
		// 		res.end("Success");
		// 	}

		// });
});

router.delete('/BusStation',function(req,res){
	
	//get bus station ID from parameter
	busStation_id = req.query.busStation_id;

	//get bus station schema
	 var BStation = mongoose.model('Bus_Station', BusStationSchema);
	//remove the bus station
	BStation.remove({ _id: busStation_id }, function(err) {
	    if (!err) {
	  		//if no error.. then it is successfull
	        res.send("Success");
	    }
	    
	});



});


//Get Single bus station
router.get('/BusStation',function(req,res, next){


	//get bus station ID from parameter
	busStation_id = req.query.busStation_id;

	 var BStation = mongoose.model('Bus_Station', BusStationSchema);
	 BStation.find({'_id' : busStation_id },function(err, stations){
	 	res.send(stations);
	 });
});

//Get all bus statation
router.get('/getAllBusStation',function(req,res, next){

	 var BStation = mongoose.model('Bus_Station', BusStationSchema);
	 BStation.find({},function(err, stations){
	 	res.send(stations);
	 });
});



/* Get single State */
router.get('/getStationById', function(req, res, next) {
	
	//get bus station ID from parameter
	station_id = req.query.station_id;
		
	var BusStation = mongoose.model('Bus_Station', BusStationSchema);
	BusStation.findOne({'_id':station_id},function(err, stations) {
	  if (err) return console.error(err);
	  res.send(stations);
	});
	
});



module.exports = router;
