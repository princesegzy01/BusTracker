'use strict';
 

angular.module('BusTracker', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
     // Routes will be here
     $routeProvider

     			// .state('partyDetail', {
     			// 	url: '/partyDetail',
        // 			controller: ''
     			// })

				.when("/dashboard", {
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
				when("/bus_station/edit/:bus_station_id", {
					templateUrl:"/partials/admin/bus_station/edit.html",
					controller: 'editBusStation'
				}).
				when("/route", {
					templateUrl:"/partials/admin/route/index.html",
					controller: 'routeIndex'
				}).
				when("/route/add", {
					templateUrl:"/partials/admin/route/add.html",
					controller: 'addRoute'
				}).
				when("/route/edit/:route_id", {
					templateUrl:"/partials/admin/route/edit.html",
					controller: 'editRoute'
				}).
				when("/customer", {
					templateUrl:"partials/admin/customer/index.html",
					controller: ''
				}).
				otherwise({
					redirectTo: '/'
				});

}]);