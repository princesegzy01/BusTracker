// angular.module('BusTrackerService',[]).
var app = angular.module('BusTracker');

app.service('BusStation', function($http){
	
	
	// Add bus Station
	this.addBusStation = function(station_object){
		
		return $http.post("/BusStation", station_object).then(function(data, status) {
            return data;
       	});
    }



	// update bus Station
	this.updateBusStation = function(station_object){
		
		return $http.put("/BusStation", station_object).then(function(data, status) {
            return data;
       	});
    }



    // update bus Station
	this.getBusStation = function(busStation_id){
		
		return $http.get("/BusStation",{params: {'busStation_id': busStation_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        });
    }

     // Add bus Station
	this.deleteBusStation = function(busStation_id){
			return $http.delete("/BusStation",{params: {'busStation_id': busStation_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        	});
	}


	// Get all Bus Station
	this.getAllBusStation = function(){
		return $http.get("/getAllBusStation").then(function(data, status) {
            return data.data;
       	});
	}

	//get Single Bus Station
	this.getSingleBusStation = function(station_id){
		return	$http.get('/getStationById',{params: {'station_id': station_id}}).then(function(response){
				return response.data;
			});
	}

});