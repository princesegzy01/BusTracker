var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



//Get all route
// router.get('/BusRoute', function(req, res, next){
// 	res.send('THis sis great');
// });


//add bus station
router.post('/BusRoute', function(req, res, next){

	var routeObject = req.body;

	
	//Add Bus Station
	 var BRoute = mongoose.model('Bus_Route', RouteSchema);
	 var BusRoute = new BRoute(routeObject);


	//Save the BUS Stateion
	BusRoute.save(function(err, BusRoute) {
		if (err) {
			// res.end("Error in Perfoming operation");
			res.send(err);
		}else{
			res.end("Success");
		}

	});

});


router.delete('/BusRoute',function(req,res){
	
	//get route ID from parameter
	route_id = req.query.route_id;

	//get bRo schema
	var BRoute = mongoose.model('Bus_Route', RouteSchema);
	//remove the bus station
	BRoute.remove({ _id: route_id }, function(err) {
	    if (!err) {
	  		//if no error.. then it is successfull
	        res.send("Success");
	    }
	    
	});



});


//Get all routes
router.get('/BusRoute',function(req,res, next){

	 if(!Bus_Route){
	 	var Bus_Route = mongoose.model('Bus_Route', RouteSchema);
	 }

	 Bus_Route.find({},function(err, routes){
	 	res.send(routes);
	 });
});



/* Get single State */
router.get('/getRouteById', function(req, res, next) {
	
	//get bus station ID from parameter
	route_id = req.query.route_id;
	// route_id = "57b8e286696613611a6da317";

	// res.send(route_id);
		
	var Bus_Route = mongoose.model('Bus_Route', RouteSchema);
	Bus_Route.findOne({'_id':route_id},function(err, routes) {
	  if (err) return console.error(err);
	  res.send(routes);
	});
	
});




module.exports = router;
