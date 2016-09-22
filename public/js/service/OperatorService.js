// angular.module('BusTrackerService',[]).
var app = angular.module('BusTracker');

app.service('Operator', function($http){
	
	
	// Add bus Station
	this.addOperator = function(operator_object){
		
		return $http.post("/Operator", operator_object).then(function(data, status) {
            return data;
       	});
    }



	// update bus Station
	this.updateOperator = function(operator_object){
		
		return $http.put("/Operator", operator_object).then(function(data, status) {
            return data;
       	});
    }



    // update bus Station
	this.getOperator = function(operator_id){
		
		return $http.get("/Operator",{params: {'operator_id': operator_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        });
    }

     // Add bus Station
	this.deleteOperator = function(operator_id){
			return $http.delete("/Operator",{params: {'operator_id': operator_id}}).then(function(data, status) {
				// console.log("Service ID :" + id);
            	return data;
        	});
	}


	this.getAllOperator = function(){
		return $http.get("/getAllOperator").then(function(data, status) {
            return data.data;
       	});
	}



	//get Single Bus Station
	// this.getSingleOperator = function(station_id){
	// 	return	$http.get('/getStationById',{params: {'station_id': station_id}}).then(function(response){
	// 			return response.data;
	// 		});
	// }

});