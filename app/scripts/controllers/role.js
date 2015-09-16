'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:PersonsCtrl
 * @description
 * # PersonsCtrl
 * Controller of the frontendApp
 */
angular.module('empApp')
    .controller('RoleCtrl',RoleCtrl);
        RoleCtrl.$inject=['$scope', '$log','dataservice','RoleFactory','$location'];

function RoleCtrl($scope,$log, dataservice,RoleFactory,$location) {



        $log.info('RoleCtrl loaded');

        $scope.getRoles = function() {

            $scope.roles= RoleFactory.getAllApplicationRoles();


        };

        $scope.addSelected = function(selected){
          console.log("adding"+ selected);


            var formData = {
                name: selected

            };

            var handleSucces = function(data,status){
                window.sessionStorage.setItem('role',selected);
                window.location.reload();
                $location.path('/dashboard');


            };


            var id = window.sessionStorage.getItem('id');
            if(id!=null) {

              dataservice.postItem('POST','http://localhost:8080/api/persons/RoleToPerson/' +id,formData,'application/json').success(handleSucces);
               // dataservice.postItem('DELETE','http://localhost:8080/api/persons/1/roles/4',null,'application/json');

            }

        };

        $scope.getRoles();
         $scope.addRole = function (role) {
            var handleRole=function(data,status){
                console.log("hey you got some");
             $scope.roles=   RoleFactory.updateFunctionalRoles();

            };

         //   dataservice.getItem('http://localhost:8080/api/roles/name/'+role.name).success(handleRole);

            var formData = {
                name: role.name,
                functional:true

            };

            dataservice.postItem('POST', 'http://localhost:8080/api/roles/', formData, 'application/json').success(handleRole);






        }}





