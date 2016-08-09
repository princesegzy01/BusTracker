angular.module('BusTrackerService',[]).

service('BusStation', function($http){
	
	// Add bus Station
	this.addBusStation = function(station_object){
		
		return $http.post("/admin/addBusStation", station_object).then(function(data, status) {
            return data;
       	});

		// console.log(station_object);
		
	}


	// Get all Bus Station
	this.getAllBusStation = function(){
		return $http.get("/admin/getAllBusStation").then(function(data, status) {
            return data.data;
       	});
	}

	//get Single Bus Station
	this.getSingleBusStation = function(){

	}

}).
service('StateCovered', function($http){
	
	// Add bus Station
	this.addState = function(){

	}


	// Get all Bus Station
	this.getAllState = function(){
			return	$http.get('/admin/getstates').then(function(response){
				return response.data;
			});
	}

	//get Single Bus Station
	this.getSingleState = function(){

	}

});