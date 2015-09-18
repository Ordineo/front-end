'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the empApp
 */
angular.module('empApp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject =['$scope', '$modal', '$log', '$http', '$location','dataservice'];

function ProfileCtrl($scope, $modal, $log, $http, $location,dataservice) {


      $log.info('ProfileCtrl loaded');

      var id =  window.sessionStorage.getItem("id");
      if(!$scope.isAdmin) {
        $scope.isAdmin = false;
      }

      $scope.makeAdmin = function(){

        var formData = {
          name:'admin',
          isFunctional:false
        };

        var handleSuccess = function(data,status,headers){
          console.log(data);

          $scope.isAdmin = true;

          //dataservice.postItem('POST','http://localhost:8080/api/persons/RoleToPerson/'+id,);

          var handleGetRole = function(data,status,headers){

            var dataForm = {
              name:data.name,
              isFunctional:data.functional
            };

            dataservice.postItem('POST','http://localhost:8080/api/persons/RoleToPerson/'+id,dataForm,'application/json');

          };

          dataservice.getItem(headers('Location')).success(handleGetRole);
        };
        dataservice.postItem('POST','http://localhost:8080/api/roles',formData,'application/json').success(handleSuccess);


      };


   $http.get('http://localhost:8080/api/persons/' + id).success(function (data) {
      console.log("GOT IT" + data);
      console.log(data);

      $scope.username = data.username;
      $scope.firstName = data.firstName;
      $scope.lastName = data.lastName;
      $scope.gender = data.gender;
      $scope.birthDate = data.birthDate;
      $scope.enrolmentDate = data.enrolmentDate;
    });
  }
