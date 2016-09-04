// angular.module('BusTrackerService',[]).
var app = angular.module('BusTracker');
app.service('StateCovered', function($http){
	
	// Add bus Station
	this.addState = function(){

	}


	// Get all Bus Station
	this.getAllState = function(){
			return	$http.get('/getstates').then(function(response){
				return response.data;
			});
	}

	//get Single Bus Station
	this.getSingleState = function(state_id){
		return	$http.get('/getStatesById',{params: {'state_id': state_id}}).then(function(response){
				return response.data;
			});
	}

});