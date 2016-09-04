// angular.module('BusTrackerService').
var app = angular.module('BusTracker');
app.service('BusRoute', function($http){
	
	
	// Add bus Station
	this.addRoute = function(route_object){
		
		return $http.post("/BusRoute", route_object).then(function(data, status) {
            return data;
       	});
    }



	// update bus Station
	this.updateRoute = function(route_object){
		
		return $http.put("/BusStation", route_object).then(function(data, status) {
            return data;
       	});
    }



    // update bus Station
	this.getRoute = function(route_id){
		
		return $http.get("/getRouteById",{params: {'route_id': route_id}}).then(function(data, status) {
            	return data;
        });
    }

     // Add bus Station
	this.deleteRoute = function(route_id){
			return $http.delete("/BusRoute",{params: {'route_id': route_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        	});
	}


	// Get all Bus Station
	this.getAllRoute = function(){
		return $http.get("/BusRoute").then(function(data, status) {
            return data.data;
       	});
	}


});