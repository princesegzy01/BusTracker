// angular.module('BusTrackerController', ['BusTrackerService'])
var app = angular.module('BusTracker');

app.controller("indexBus",['$scope','Operator','$http','Operator','BusRoute','Tracker','Bus','$window', function($scope,Operator,$http,Operator,BusRoute,Tracker,Bus,$window){
  
    //get all bus station
    Bus.getAllBus().then(function(buses){
      $scope.buses = buses;

        angular.forEach($scope.buses, function (singleBus) { 
            //get state covered in a promise

              //gET oPERATOR NAME
              Operator.getOperator(singleBus.operator).then(function(response){
                   singleBus.operator_name = response.data[0].name;
              });


             

               //gET Route NAME
              BusRoute.getRoute(singleBus.route).then(function(response){
                   // singleBus.route_name = response.data[0].name;
                   singleBus.route_name = response.data.name;
              });

               //gET Tracker NAME
              Tracker.getTracker(singleBus.tracker).then(function(response){
                   singleBus.tracker_name = response.data[0].name;
              });

        })

    });

    //Delete Bus Station
    $scope.deleteBus = function(id){
        Bus.deleteBus(id).then(function(response){

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


app.controller("addBus",['$scope','$http','Operator','Bus','BusRoute','Tracker',function($scope, $http,Operator,Bus,BusRoute,Tracker){

  //load all operator
   Operator.getAllOperator().then(function(operators){
    $scope.operators = operators;
   });

   //load all tracker
   Tracker.getAllTracker().then(function(trackers){
    $scope.trackers = trackers;
   });

   //Load all route
   BusRoute.getAllRoute().then(function(routes){
    $scope.routes = routes;
   });

 
  
  //   //submit the form for processing
    $scope.submitForm = function(form){

              
        $scope.success_form =""; 
        $scope.warning_form =""; 
        $scope.error_form ="";      

       
        if(form.$valid == false){
          $scope.error_form ="true";
          return false;
        }

       
          var bus_object = {
            name : $scope.txt_name,
            operator : $scope.sel_operator,
            plate_no : $scope.txt_plate_no,
            size : $scope.txt_size,
            color : $scope.sel_color,
            isActive : $scope.sel_status,
            tracker : $scope.sel_tracker,
            route : $scope.sel_route
          }


          Bus.addBus(bus_object).then(function(result){

              if(result.data == "Success"){
                 $scope.success_form ="true";

                 $scope.txt_name = "";
                 $scope.txt_plate_no = "";
                 $scope.txt_size = "";

                 $scope.sel_color = "";
                 $scope.sel_status = "";
                 $scope.sel_tracker = "";
                 $scope.sel_route = "";

                 

              }else{
                  $scope.warning_form ="true";
              }
          });



         
          
         
        
    }//End submit form

}])

app.controller('editBus',['$scope','$routeParams','StateCovered','Operator','Bus','BusRoute','Tracker','$window',function($scope,$routeParams,StateCovered,Operator,Bus,BusRoute,Tracker,$window){

        // console.log($routeParams);

        bus_id = $routeParams.bus_id;


        //load all operator
      Operator.getAllOperator().then(function(operators){
          $scope.operators = operators;
        });
  

          //load all tracker
     Tracker.getAllTracker().then(function(trackers){
      $scope.trackers = trackers;
     });

     //Load all route
     BusRoute.getAllRoute().then(function(routes){
      $scope.routes = routes;
     });


        //preload data
      Bus.getBus(bus_id).then(function(result){

        // StateCovered.getSingleState(result.data[0].state).then(function(response){
        //   $scope.state_name = response.states_name;
        // });
       
        // console.log(result.data[0]._id);

        // $scope.operator_id = result.data[0]._id;
        $scope.txt_bus_id = result.data[0]._id;
        $scope.txt_name = result.data[0].name;
        $scope.sel_operator = result.data[0].operator;
        $scope.txt_plate_no = result.data[0].plate_no;
        $scope.txt_size = result.data[0].size;
        $scope.sel_color = result.data[0].color;
        $scope.sel_status = result.data[0].isActive;
        $scope.sel_route = result.data[0].route;
        $scope.sel_tracker = result.data[0].tracker;
      

      });

      //Edit Bus Station
      $scope.editBus = function(form){


              $scope.success_form =""; 
              $scope.warning_form =""; 
              $scope.error_form ="";      

              if(form.$valid == false){
                $scope.error_form ="true";
                return false;
              }

                var bus_object = {
                   _id :  $scope.txt_bus_id,
                  name : $scope.txt_name,
                  operator : $scope.sel_operator,
                  plate_no : $scope.txt_plate_no,
                  size : $scope.txt_size,
                  color : $scope.sel_color,
                  isActive : $scope.sel_status,
                  route :  $scope.sel_route,
                  tracker : $scope.sel_tracker
                }

                // console.log(operator_object);
                // return false;
                
              Bus.updateBus(bus_object).then(function(result){

                  if(result.data == "Sucesss"){
                     $scope.success_form ="true";
                      $window.location.href= "#/bus";
                  }else{
                      $scope.warning_form ="true";
                  }
              });





      }
  
}]);

