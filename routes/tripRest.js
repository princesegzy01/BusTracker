var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');

//add Trip
router.post('/Trip', function(req, res, next){

	var tripObject = req.body;

	console.log(tripObject);

	 var Trip  = mongoose.model('Trip', TripSchema);
	 var MyTrip = new Trip(tripObject);


	//Save Trip
	MyTrip.save(function(err, Trip) {
		if (err) {
			// res.end("Error in Perfoming operation");
			res.send(err);
		}else{
			res.end("Success");
		}

	});

});

//delete trip
router.delete('/Trip',function(req,res){
	
	//get trip ID from parameter
	trip_id = req.query.trip_id;

	//get trip schema
	var Trip = mongoose.model('Trip', TripSchema);
	//remove the trip
	Trip.remove({ _id: trip_id }, function(err) {
	    if (!err) {
	  		//if no error.. then it is successfull
	        res.send("Success");
	    }
	    
	});
});


//Get all Trip
router.get('/Trip',function(req,res, next){

	 //if(!Bus_Route){
	 	var Trip = mongoose.model('Trip', TripSchema);
	// }

	 Trip.find({},function(err, trips){
	 	res.send(trips);
	 });
});



/* Get single Trip */
router.get('/getTripById', function(req, res, next) {
	
	//get Trip ID from parameter
	trip_id = req.query.trip_id;
	
	
	var Trip = mongoose.model('Trip', TripSchema);
	Trip.findOne({'_id':trip_id},function(err, trip) {
	  if (err) return console.error(err);
	  res.send(trip);
	});
	
});


router.get('/getAvailableBusTrip', function(req,res,next){

		var busRoute = [];

	 	var Bus_Route = mongoose.model('Bus_Route', RouteSchema);
	 	
	 	pickup = req.query.pickup;
	 	dropoff = req.query.dropoff;

	 	// var pickup = "57e5a82cc2d92f1100ebbc92";
	 	// var dropoff = "57adba936dedaa110077a4e9";

	 Bus_Route.find({
	 	stations : { $elemMatch: {station_id : pickup, station_id : dropoff }}

	 },function(err, routes){
	 	// busRoute.push(routes);

	 	// console.log(routes)
	 			routes.forEach(function(route) { 
    
				    //print(route);
				    //route_id = route._id.toString();
				    var route_id_str = route._id;
				    //print(route._id.str)

				    //console.log(route_id_str);

				    busRoute.push(route_id_str);
			   
			    })


			   BusAutomobile.find({'route' : { $in: busRoute }}, function(err, Bus){
			   		//console.log(Bus);
			   		res.send(Bus);
			   });


	 });

	 // res.send(busRoute)

	//res.send("Hello 3");
});

module.exports = router;
