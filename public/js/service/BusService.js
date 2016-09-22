// angular.module('BusTrackerService',[]).
var app = angular.module('BusTracker');

app.service('Bus', function($http){
	
	
	// Add bus Station
	this.addBus = function(bus_object){
		
		return $http.post("/Bus", bus_object).then(function(data, status) {
            return data;
       	});
    }



	// update bus Station
	this.updateBus = function(bus_object){
		
		return $http.put("/Bus", bus_object).then(function(data, status) {
            return data;
       	});
    }



    // update bus Station
	this.getBus = function(bus_id){
		
		return $http.get("/Bus",{params: {'bus_id': bus_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        });
    }

     // Add bus Station
	this.deleteBus = function(bus_id){
			return $http.delete("/Bus",{params: {'bus_id': bus_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        	});
	}


	// Get all Bus Station
	this.getAllBus = function(){
		return $http.get("/getAllBus").then(function(data, status) {
            return data.data;
       	});
	}

	
});