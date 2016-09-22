// angular.module('BusTrackerController', ['BusTrackerService'])
var app = angular.module('BusTracker');

app.controller("indexOperator",['$scope','Operator','$http','StateCovered','$window', function($scope,Operator,$http,StateCovered,$window){
  

    //get all Operators
    Operator.getAllOperator().then(function(operators){
      $scope.operators = operators;

        angular.forEach($scope.operators, function (singleOperator) { 
            //get state covered in a promise
              StateCovered.getSingleState(singleOperator.state).then(function(response){
                    //edit json and add state                  
                   singleOperator.state_name = response.states_name;
              });

        })

    });

    //Delete Bus Station
    $scope.deleteOperator = function(id){
        Operator.deleteOperator(id).then(function(response){

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


app.controller("addOperator",['$scope','$http','StateCovered','Operator',function($scope, $http, StateCovered,Operator){

  //load state into select drop down 
   StateCovered.getAllState().then(function(states){
    $scope.states = states;
   });

  // $scope.getSingleState = function(){
  //     StateCovered.getSingleState().then(function(data){
  //       console.log(data);  
  //     });
  // }
  
  //   //submit the form for processing
    $scope.submitForm = function(form){

              
        $scope.success_form =""; 
        $scope.warning_form =""; 
        $scope.error_form ="";      

        if(form.$valid == false){
           
          $scope.error_form ="true";
          return false;
        }

     

          var operator_object = {
            name : $scope.txt_name,
            state : $scope.sel_state,
            email : $scope.txt_email,
            phone : $scope.txt_phone,
            address : $scope.txt_address
          }


          Operator.addOperator(operator_object).then(function(result){

              if(result.data == "Success"){
                 $scope.success_form ="true";

                 $scope.txt_name = "";
                 $scope.txt_email = "";
                 $scope.txt_phone = "";
                 $scope.txt_address = "";
                 // $scope.txt_phone = "";


              }else{
                  $scope.warning_form ="true";
              }
          });



         
          
         
        
    }//End submit form

}])

app.controller('editOperator',['$scope','$routeParams','StateCovered','Operator','$window',function($scope,$routeParams,StateCovered,Operator, $window){

        // console.log($routeParams);

        operator_id = $routeParams.operator_id;
      // alert($routeParams.bus_station_id);
      

       //load state into select drop down 
         StateCovered.getAllState().then(function(states){
              $scope.states = states;
         });

      //preload data
      Operator.getOperator(operator_id).then(function(result){

        StateCovered.getSingleState(result.data[0].state).then(function(response){
          $scope.state_name = response.states_name;
        });
        

        // console.log(result.data[0]._id);

        // $scope.operator_id = result.data[0]._id;
        $scope.txt_operator_id = result.data[0]._id;
        $scope.txt_name = result.data[0].name;
        $scope.sel_state = result.data[0].state;
        $scope.txt_phone = result.data[0].phone;
        $scope.txt_email = result.data[0].email;
        $scope.txt_address = result.data[0].address;
      

      });

      //Edit Bus Station
      $scope.editOperator = function(form){


              $scope.success_form =""; 
              $scope.warning_form =""; 
              $scope.error_form ="";      

              if(form.$valid == false){
                $scope.error_form ="true";
                return false;
              }

                var operator_object = {
                   _id :  $scope.txt_operator_id,
                  name : $scope.txt_name,
                  state : $scope.sel_state,
                  email : $scope.txt_email,
                  phone : $scope.txt_phone,
                  address : $scope.txt_address
                }

                // console.log(operator_object);
                // return false;
                
              Operator.updateOperator(operator_object).then(function(result){

                console.log(result);
                  if(result.data == "Sucesss"){
                     $scope.success_form ="true";
                      $window.location.href= "#/operator";
                  }else{
                      $scope.warning_form ="true";
                  }
              });





      }
  
}]);

