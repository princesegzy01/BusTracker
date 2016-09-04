// angular.module('BusTrackerController', ['BusTrackerService'])
var app = angular.module('BusTracker');

app.controller("addRoute",['$scope','$http','BusStation','BusRoute','$window',function($scope, $http,BusStation,BusRoute,$window){
  
  // BusRoute.getAllRoute

  //fill total list if available
  totalListItems = $window.localStorage.getItem("busStationArray");
  $scope.totalListItems = JSON.parse(totalListItems);

  // angular.forEach(totalListItems, function(value){
  // 	console.log(value);

  // });

  //get all bus station
  BusStation.getAllBusStation().then(function(data){
    $scope.busStations = data;
  });


  		$scope.handleDrop = function() {
    		
    		// console.log($scope.busStations[1]);
    		// console.log($(".bsid")[1].innerText);
    		// console.log();

			
			//var busStationObject = {}   


			$window.localStorage.removeItem('busStationArray');		
			
			var oldItems  = [];

    		$(".bsid").each(function(i, obj){
            

            	station_text = obj.innerText;


            	var station_array = station_text.split("---");

            	station_name = $.trim(station_array[0]);
            	station_id = $.trim(station_array[1]);

            	// var stationObject = { 'station_id': '65555555', 'station_name': 'OYO'	};
            	var stationObject = {'station_id':station_id,'station_name':station_name};

            	
				oldItems.push(stationObject);
        });

    		// console.log(oldItems);
    		// console.log(JSON.stringify(oldItems));

    		station_object = JSON.stringify(oldItems);
    		$window.localStorage.setItem('busStationArray', station_object);
    		// totalListItems = $window.localStorage.getItem("busStationArray");
  			// $scope.totalListItems = JSON.parse(station_object);

  			alert('Route Successfully Arranged');

  		}

  		//THis fuction will add station to list
		  $scope.addRouteToList = function(){
			  
			  	station_id = $scope.sel_busStation._id;
			  	station_name = $scope.sel_busStation.name;

			  	//console.log(station_id + "   --  " + station_name);


			  	var oldItems = JSON.parse(localStorage.getItem('busStationArray')) || [];

				var stationObject = { 'station_id': station_id, 'station_name': station_name	};

				oldItems.push(stationObject);

				$window.localStorage.setItem('busStationArray', JSON.stringify(oldItems));
				
				//Convert to object and part scope to view
				totalListItems = $window.localStorage.getItem("busStationArray");
  				$scope.totalListItems = JSON.parse(totalListItems);

		  }


		  //This  fuction will remove function from list
		  $scope.removeStaation = function(index){

		  			//get array and pass to view
		  			busStation = JSON.parse($window.localStorage.getItem("busStationArray"));
		  			//remove from array via index
		  			busStation.splice(index,1);

		  			//remove the whole array 
		  			$window.localStorage.removeItem("busStationArray")

		  			//set new busStation Array
		  			$window.localStorage.setItem("busStationArray", JSON.stringify(busStation))

		  			//get the new bus station and send it to view
		  			$scope.totalListItems  = JSON.parse($window.localStorage.getItem("busStationArray"));

		  			alert('Station Successfully Removed from list');
		  }


		  // This function will create the route to the database
		  $scope.createRoute = function(){

		  

		  	if($scope.txt_route_name === undefined){
		  		$scope.error_form = true;
		  		return false;
		  	}


		  	totalListItems = $window.localStorage.getItem("busStationArray");
  			totalListItems = JSON.parse(totalListItems);



		  if(!totalListItems || !totalListItems.length > 0){
		  	alert('You must add at least one bus station to the list');
		  	return false;
		  }
		  

		  	var routeObject = {
		  		name : $scope.txt_route_name,
		  		stations : totalListItems
		  		
		  	}




		  	//send the route to http
		  	BusRoute.addRoute(routeObject).then(function(response){
		  		

		  		if(response.data == "Success"){
		  			$scope.txt_route_name = "";
		  			$window.localStorage.removeItem("busStationArray");

		  			//get array and pass to view
		  			totalListItems = $window.localStorage.getItem("busStationArray");
		  			$scope.totalListItems = JSON.parse(totalListItems);

		   			alert('Route Successfully Created');
		  		}else{
		  			$scope.error_form = true;
		  		}
		  		
		  	});

		  	
		  }// End create Route




}]);

app.controller("routeIndex",['$scope','BusRoute','BusStation',function($scope,BusRoute,BusStation){
		//Get all routes and post it to the view
		BusRoute.getAllRoute().then(function(result){
			// console.log(result);
			$scope.routes = result;

			// console.log(result[0].stations);

			//loop through each route
			angular.forEach($scope.routes, function (singleRoute,key) {

				//loop through each stations inside route
				angular.forEach($scope.routes[key].stations, function (stations) {

					
		            //get station in a promise
		              BusStation.getSingleBusStation(stations.station_id).then(function(response){
		                    //edit json and add state                  
		                   stations.station_name = response.name;
		                   // console.log(response.name);
		              });
		        })
      		})



		});


				  //Delete Route
    $scope.deleteRoute = function(id){

        BusRoute.deleteRoute(id).then(function(response){

          // console.log(response);
            if(response.data == "Success"){
              // $window.location.href= "#operation";
              alert('Successfully Deleted');
              window.location.reload(true);
              // $window.location.href= "#/busss_station";
            }
        });
    }
    
}]);

app.controller("editRoute",['$scope','$http','$routeParams','BusStation','BusRoute','$window',function($scope, $http,$routeParams,BusStation,BusRoute,$window){

	  //get all bus station
  BusStation.getAllBusStation().then(function(data){
    $scope.busStations = data;
    //console.log($scope.busStations);
  });


	//load selected routes
  	route_id = $routeParams.route_id;
	BusRoute.getRoute(route_id).then(function(data){

    	$scope.routes = data.data
    	
       	//Add station name to the array
       	angular.forEach($scope.routes.stations, function (singleStation,key) {
	    	
	  //           //get station in a promise
	          BusStation.getSingleBusStation(singleStation.station_id).then(function(response){
	                //edit json and add state     
	                // console.log(response);             
	               singleStation.station_name = response.name;

	          });

	    });


       	console.log($scope.routes.stations);
       	 $window.localStorage.setItem('busArray', JSON.stringify($scope.routes.stations));      

	    // $window.localStorage.setItem('busStationArray', JSON.stringify(oldItems));      
    	
  	});
			//THis fuction will add station to list
		  $scope.addRouteToList = function(){
			  	
			  	// console.log($scope.sel_busStation._id);
			  	// return false;

			  	station_id = $scope.sel_busStation._id;
			  	station_name = $scope.sel_busStation.name;

			  	//console.log(station_id + "   --  " + station_name);


			  	var oldItems = JSON.parse(localStorage.getItem('busStationArray')) || [];

				var stationObject = { 'station_id': station_id, 'station_name': station_name	};

				oldItems.push(stationObject);

				$window.localStorage.setItem('busStationArray', JSON.stringify(oldItems));
				
				//Convert to object and part scope to view
				totalListItems = $window.localStorage.getItem("busStationArray");
  				$scope.totalListItems = JSON.parse(totalListItems);

		  }




				//remove bus station from list
			  $scope.removeStaation = function(index){

		  			//get array and pass to view
		  			busStation = JSON.parse($window.localStorage.getItem("busStationArray"));
		  			//remove from array via index
		  			busStation.splice(index,1);

		  			//remove the whole array 
		  			$window.localStorage.removeItem("busStationArray")

		  			//set new busStation Array
		  			$window.localStorage.setItem("busStationArray", JSON.stringify(busStation))

		  			//get the new bus station and send it to view
		  			$scope.totalListItems  = JSON.parse($window.localStorage.getItem("busStationArray"));

		  			alert('Station Successfully Removed from list');
		  }

}]);


// app.controller('DragDropCtrl', function($scope) {
//   $scope.handleDrop = function() {
//     alert('Item has been dropped');
//   }
// });