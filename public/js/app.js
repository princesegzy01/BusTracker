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
				when("/operator", {
					templateUrl:"/partials/admin/operators/index.html",
					controller: 'indexOperator'
				}).
				when("/operator/add", {
					templateUrl:"/partials/admin/operators/add.html",
					controller: 'addOperator'
				}).
				when("/operator/edit/:operator_id", {
					templateUrl:"/partials/admin/operators/edit.html",
					controller: 'editOperator'
				}).
				when("/bus", {
					templateUrl:"/partials/admin/bus/index.html",
					controller: 'indexBus'
				}).
				when("/bus/add", {
					templateUrl:"/partials/admin/bus/add.html",
					controller: 'addBus'
				}).
				when("/bus/edit/:bus_id", {
					templateUrl:"/partials/admin/bus/edit.html",
					controller: 'editBus'
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
				}).when("/tracker", {
					templateUrl:"/partials/admin/tracker/index.html",
					controller: 'indexTracker'
				}).
				when("/tracker/add", {
					templateUrl:"/partials/admin/tracker/add.html",
					controller: 'addTracker'
				}).
				when("/tracker/edit/:tracker_id", {
					templateUrl:"/partials/admin/tracker/edit.html",
					controller: 'editTracker'
				}).
				when("/customer", {
					templateUrl:"partials/admin/customer/index.html",
					controller: ''
				}).
				otherwise({
					redirectTo: '/'
				});

}]);