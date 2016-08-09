var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('admin/index', { title: 'Express' });
  // res.send('respond with a resource');
});


/* Get all State */
router.get('/getstates', function(req, res, next) {
	

	var States = mongoose.model('States', StatesSchema);
	States.find(function(err, states) {
	  if (err) return console.error(err);
	  // console.dir(movies);
	  res.send(states);
	});
	// console.log(states);

   // res.send(states);
});


//add bus station
router.post('/addBusStation', function(req, res, next){

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

router.get('/getAllBusStation',function(req,res, next){

	 var BStation = mongoose.model('Bus_Station', BusStationSchema);
	 BStation.find({},function(err, stations){
	 	res.send(stations);
	 });
});


module.exports = router;
