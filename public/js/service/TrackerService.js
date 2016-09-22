// angular.module('BusTrackerService',[]).
var app = angular.module('BusTracker');

app.service('Tracker', function($http){
	
	
	// Add bus Station
	this.addTracker = function(tracker_object){
		
		return $http.post("/Tracker", tracker_object).then(function(data, status) {
            return data;
       	});
    }



	// update bus Station
	this.updateTracker = function(tracker_object){
		
		return $http.put("/Tracker", tracker_object).then(function(data, status) {
            return data;
       	});
    }



    // update bus Station
	this.getTracker = function(tracker_id){
		
		return $http.get("/Tracker",{params: {'tracker_id': tracker_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        });
    }

     // Add bus Station
	this.deleteTracker = function(tracker_id){
			return $http.delete("/Tracker",{params: {'tracker_id': tracker_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        	});
	}


	// Get all Bus Station
	this.getAllTracker = function(){
		return $http.get("/getAllTracker").then(function(data, status) {
            return data.data;
       	});
	}

	
});