'use strict';
 
angular.module('BusTracker', [
  'ngRoute', 'BusTrackerController'
]).
config(['$routeProvider', function($routeProvider) {
     // Routes will be here
     $routeProvider.
				when("/dashboard", {
					templateUrl: "partials/admin/dashboard/index.html",
					controller: ''
				}).
				when("/bus_station", {
					templateUrl:"/partials/admin/bus_station/index.html",
					controller: 'indexBusStation'
				}).
				when("/bus_station/add", {
					templateUrl:"/partials/admin/bus_station/add.html",
					controller: 'addBusStation'
				}).
				when("/customer", {
					templateUrl:"partials/admin/customer/index.html",
					controller: ''
				}).
				otherwise({
					redirectTo: '/'
				});

}]);