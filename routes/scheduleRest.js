var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');



//add bus station
router.post('/scheduleTrip', function(req, res, next){

	var scheduleObjectData = req.body;


	//Add Schedule
	 var Schedule = mongoose.model('schedule', ScheduleSchema);
	 var ScheduleObject = new Schedule(scheduleObjectData);


	//Save the BUS Stateion
	ScheduleObject.save(function(err, schedule) {
		if (err) {
			// res.end("Error in Perfoming operation");
			res.send(err);
		}else{
			res.end("Success");
		}

	});


});

//Get Single bus station
router.get('/getScheduleTripByEmail',function(req,res, next){


	//get bus station ID from parameter
	email = req.query.email;

	var Schedule = mongoose.model('schedule', ScheduleSchema);

	 Schedule.find({'email' : email },function(err, schedule){
	 	res.send(schedule);
	 });
});


//Get Single bus station
router.get('/getScheduleTripById',function(req,res, next){


	//get bus station ID from parameter
	schedule_id = req.query.schedule_id;

	var Schedule = mongoose.model('schedule', ScheduleSchema);

	 Schedule.find({'_id' : schedule_id },function(err, schedule){
	 	res.send(schedule);
	 });
});

//Get all bus statation
router.get('/scheduleTrip',function(req,res, next){

	var Schedule = mongoose.model('schedule', ScheduleSchema);

	 Schedule.find({},function(err, schedule){
	 	res.send(schedule);
	 });

});





module.exports = router;
