// angular.module('BusTrackerController', ['BusTrackerService'])
var app = angular.module('BusTracker');

app.controller("indexBusStation",['$scope','BusStation','$http','StateCovered','$window', function($scope,BusStation,$http,StateCovered,$window){
  



    //get all bus station
    BusStation.getAllBusStation().then(function(stations){
      $scope.stations = stations;
      // $scope.sn;

        angular.forEach($scope.stations, function (singleStation) {

           
            //Get State name from state_id
            // $http.get('/api/' + staff.StaffID + '/appointments').then(function(response){
            //  $http.get('/getStatesById/').then(function(response){
            //     stations.state_name = response.data.states_name;
            //     console.log("Station name : " + response.data.states_name);
            // })
            
            //get state covered in a promise
              StateCovered.getSingleState(singleStation.state).then(function(response){
                    //edit json and add state                  
                   singleStation.state_name = response.states_name;
              });

        })

    });

    //Delete Bus Station
    $scope.deleteBustation = function(id){
        BusStation.deleteBusStation(id).then(function(response){

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


app.controller("addBusStation",['$scope','$http','StateCovered','BusStation',function($scope, $http, StateCovered,BusStation){

  //load state into select drop down 
   StateCovered.getAllState().then(function(states){
    $scope.states = states;
   });

  $scope.getSingleState = function(){
      StateCovered.getSingleState().then(function(data){
        console.log(data);  
      });
  }
  
  //   //submit the form for processing
    $scope.submitForm = function(form){

              
        $scope.success_form =""; 
        $scope.warning_form =""; 
        $scope.error_form ="";      

        if(form.valid){
           
          $scope.error_form ="true";
          return false;
        }

     

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

}])

app.controller('editBusStation',['$scope','$routeParams','StateCovered','BusStation','$window',function($scope,$routeParams,StateCovered,BusStation, $window){

      bus_station_id = $routeParams.bus_station_id;
      // alert($routeParams.bus_station_id);
      

       //load state into select drop down 
         StateCovered.getAllState().then(function(states){
              $scope.states = states;
         });

      //preload data
      BusStation.getBusStation(bus_station_id).then(function(result){

        StateCovered.getSingleState(result.data[0].state).then(function(response){
          $scope.state_name = response.states_name;
        });
      

        $scope.txt_busstation_id = result.data[0]._id;
        $scope.txt_station_name = result.data[0].name;
        $scope.sel_state = result.data[0].state;
        $scope.txt_longitude = result.data[0].longitude;
        $scope.txt_latitude = result.data[0].latitude;
      

      });

      //Edit Bus Station
      $scope.editStation = function(form){


              $scope.success_form =""; 
              $scope.warning_form =""; 
              $scope.error_form ="";      

              if(form.valid){
                $scope.error_form ="true";
                return false;
              }

         

              var busStation_object = {
                _id :  $scope.txt_busstation_id,
                name : $scope.txt_station_name,
                state : $scope.sel_state,
                longitude : $scope.txt_longitude,
                latitude : $scope.txt_latitude
              }

              // console.log(busStation_object);


               BusStation.updateBusStation(busStation_object).then(function(result){

              

                  if(result.data == "Sucesss"){
                     $scope.success_form ="true";
                      $window.location.href= "#/bus_station";
                  }else{
                      $scope.warning_form ="true";
                  }
              });





      }
  
}]);

