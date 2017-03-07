var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Model = require('../model/model');
var request = require('request');





//add  tracker
router.post('/Tracker', function(req, res, next){

	var TrackerObject = req.body;
	
	  var username = "princesegzy01@yahoo.com";
	  var password = "1nigeria";
    
    	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


    	
	
						//post to traccar api for new traccar
						request.post({
						     url: "http://104.199.151.237:8082/api/devices",
						     method: 'POST',
						     headers: {
						        "Content-Type": "application/json",
						        "Authorization" : auth
						     },
						     body: {
						       "name": TrackerObject.name,
						       "uniqueId":TrackerObject.imei,
						       "category":"bus",
						       "groupId":"1",
						       "model": TrackerObject.manufacturer + " - " + TrackerObject.model,
						       "phone" : TrackerObject.phone

						       // "name":"2.0",
						       // "uniqueId":"zdoLXrB5IkwQzwV2wBoj",
						       // "category":"car",
						       // "groupId":"1",
						       // "model":"Tk Star"
						     },
						     json:true
						}, function(error, response, body){
						   
						   console.log("Done adding traccar to traccar server");

						   //console.log(error);
						   //console.log(JSON.stringify(response));
						   //console.log(body);
						   TrackerObject.tracker_api_id = body.id;
						   // TrackerObject.tracker_api_id = '891';

						   			// create cracker model
						   			TrackerModel = new Tracker(TrackerObject);

								   //Save the Tracker
									TrackerModel.save(function(err, operator) {
									  if (err) {
											res.end("Error in Perfoming operation");
											}else{

											//end post to new traccar

											res.end("Success");
										}

									});

						});		
});


//add  tracker
router.get('/getLastKnonwPositionOfTracker', function(req, res, next){


		//console.log(req.body.tracker_array);

	 var username = "princesegzy01@yahoo.com";
	 var password = "1nigeria";
    
  
    var totalTracker = [];

    	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

 

	 
	 //post to traccar api for new traccar
						request({
						     url: "http://104.199.151.237:8082/api/positions",
						    // method: 'GET',
						     headers: {
//						     	'User-Agent': 'request'	
						        // "Content-Type": "application/json",
						        'accept' : 'application/json',
						        'Authorization' : auth
						     }
						}, function(error, response, body){
						   var result = JSON.parse(body);					  

							// var trackerIDS = [17,19,25,30,18];
							var trackerIDS = [20];
							var trackerResponse = [];


							//loop through each IDs
							//trackerIDS.forEach(function(tID){
							// 	console.log(tID);
								var arrFound = result.filter(function(item) {
									  return item.deviceId ==  20;//tID;
								});

								if(arrFound.length > 0){
									// trackerResponse.push(arrFound);
									trackerResponse.push(arrFound[0]);
								}
									
							//})

						   res.send(trackerResponse);
				
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


//Get Tracker
router.get('/Tracker',function(req,res, next){

	// console.log(req.query);
	//get bus station ID from parameter
	tracker_id = req.query.tracker_id;
	// tracker_id = "58ac2bc0874fedc915b9ce9f";
	// tracker_id = mongoose.Types.ObjectId(tracker_id);
	// console.log(tracker_id);

	// '_id' : tracker_id
	// var Tracker = mongoose.model('tracker', TrackerSchema);
	 Tracker.find({'_id' : tracker_id},function(err, trackers){
	 	//console.log(trackers);
	 	res.send(trackers);
	 });
});

//Get all bus statation
router.get('/getAllTracker',function(req,res, next){

	Tracker.find({},function(err, bus){
	 	//console.log(bus);
	 	res.send(bus);
	 });
});



module.exports = router;
