var distance = require('google-distance-matrix');

var express = require('express');
var router = express.Router();


//Get all Trip
router.get('/getDistanceBetweenTwoPoint',function(req,res, next){

		var key;
		var mode = req.query.mode;
		
		
		var origin_lat = req.query.origin_lat;
		var origin_long = req.query.origin_long;

		var destination_lat = req.query.destination_lat;
		var destination_long = req.query.destination_long;

		// distance.key();
		distance.mode(mode);
		distance.avoid('tolls');
		distance.units('metric');



		// var origins = ['San Francisco CA'];
		// var destinations = ['New York NY', '41.8337329,-87.7321554'];

		var origins = [origin_lat + ',' + origin_long];
		var destinations = [ destination_lat + ',' + destination_long];


		distance.matrix(origins, destinations, function (err, distances) {
		    if (!err){
		 		res.send(distances);
		        console.log(distances);
		    }
		});


});


module.exports = router;
