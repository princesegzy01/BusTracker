angular.module('BusTrackerController', ['BusTrackerService'])


.value('AppInfo', {
  appName : "BusTracker",
appVersion  : "1.0",
// apiUrl: "http://qrestconcepts/upsMobileWeb/executor/"

// apiUrl: "http://localhost/upsMobileWeb/executor/"
apiUrl: "http://www.michaelsodium.com/upsMobileWeb/executor/"
})

.controller("indexBusStation",['$scope','BusStation', function($scope,BusStation){
  
    //get all bus station
    BusStation.getAllBusStation().then(function(stations){
      console.log(stations);
      $scope.stations = stations;
      $scope.sn;
    });

}])


.controller("addBusStation",['$scope','$http','StateCovered','BusStation',function($scope, $http, StateCovered,BusStation){


  //load state into select drop down 
   StateCovered.getAllState().then(function(states){
    $scope.states = states;
    //console.log(states);
   });

  
  //   //submit the form for processing
    $scope.submitForm = function(form){

              
        $scope.success_form =""; 
        $scope.warning_form =""; 
        $scope.error_form ="";      

        if(form.valid){
           
          $scope.error_form ="true";
          // console.log("form is not valid");
          return false;
        }

        // console.log("form is valid");
          //console.log($scope.txt_latitude);


          var busStation_object = {
            name : $scope.txt_station_name,
            state : $scope.sel_state,
            longitude : $scope.txt_longitude,
            latitude : $scope.txt_latitude
          }


          BusStation.addBusStation(busStation_object).then(function(result){

              // console.log(result == 'Success');

              if(result.data == "Success"){
                 $scope.success_form ="true";

                 $scope.txt_station_name = "";
                 $scope.txt_longitude = "";
                 $scope.txt_latitude = "";

              }else{
                  $scope.warning_form ="true";
              }
          });



         
          
         
        
    }//End submit form

}]);
