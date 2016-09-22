// angular.module('BusTrackerController', ['BusTrackerService'])
var app = angular.module('BusTracker');

app.controller("indexTracker",['$scope','$http','Tracker','$window', function($scope,$http,Tracker,$window){
  
    //get all bus station
    Tracker.getAllTracker().then(function(trackers){
      $scope.trackers = trackers;
    });

    //Delete Bus Station
    $scope.deleteTracker = function(id){
        Tracker.deleteTracker(id).then(function(response){

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


app.controller("addTracker",['$scope','$http','Tracker',function($scope, $http,Tracker){

 
  //   //submit the form for processing
    $scope.submitForm = function(form){

              
        $scope.success_form =""; 
        $scope.warning_form =""; 
        $scope.error_form ="";      

       
        if(form.$valid == false){
          $scope.error_form ="true";
          return false;
        }

       
          var tracker_object = {
            name : $scope.txt_name,
            imei : $scope.txt_imei,
            manufacturer : $scope.txt_manufacturer,
            model : $scope.txt_model,
            isActive : $scope.sel_status
          }


          Tracker.addTracker(tracker_object).then(function(result){

              if(result.data == "Success"){
                 $scope.success_form ="true";

                 $scope.txt_name = "";
                 $scope.txt_imei = "";
                 $scope.txt_manufacturer = "";
                 $scope.txt_model = "";
                 

              }else{
                  $scope.warning_form ="true";
              }
          });



         
          
         
        
    }//End submit form

}])

app.controller('editTracker',['$scope','$routeParams','Tracker','$window',function($scope,$routeParams,Tracker, $window){

        // console.log($routeParams);

        tracker_id = $routeParams.tracker_id;


      //preload data
      Tracker.getTracker(tracker_id).then(function(result){

        

        
        $scope.txt_tracker_id = result.data[0]._id;
        $scope.txt_name = result.data[0].name;
        $scope.txt_imei = result.data[0].imei;
        $scope.txt_manufacturer = result.data[0].manufacturer;
        $scope.txt_model = result.data[0].model;
        $scope.sel_status = result.data[0].isActive;
      

      });

      //Edit Bus Station
      $scope.editTracker = function(form){


              $scope.success_form =""; 
              $scope.warning_form =""; 
              $scope.error_form ="";      

              if(form.$valid == false){
                $scope.error_form ="true";
                return false;
              }

                var tracker_object = {
                   _id :  $scope.txt_tracker_id,
                  name : $scope.txt_name,
                  imei : $scope.txt_imei,
                  model : $scope.txt_model,
                  manufacturer : $scope.txt_manufacturer,
                  isActive : $scope.sel_status
                }

                // console.log(operator_object);
                // return false;
                
              Tracker.updateTracker(tracker_object).then(function(result){

                  if(result.data == "Sucesss"){
                     $scope.success_form ="true";
                      $window.location.href= "#/tracker";
                  }else{
                      $scope.warning_form ="true";
                  }
              });





      }
  
}]);

