'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:PersonsCtrl
 * @description
 * # PersonsCtrl
 * Controller of the frontendApp
 */
angular.module('empApp')
  .controller('PersonsCtrl',PersonsCtrl);
PersonsCtrl.$inject =['$scope', '$log', '$http', '$location', 'PersonFactory','dataservice','$cookies'];

function PersonsCtrl ($scope, $log, $http, $location, PersonFactory,dataservice,$cookies) {
    $log.info('PersonsCtrl loaded');


    $scope.validate = function (person) {
      console.log('Validating person...');





      var handleSuccess = function (data, status) {
        console.log("Person created");

        $location.path('/login');
        };

      if($scope.form.$valid) {

        var birthDate = new Date(person.birthDate);
        var enrolmentDate = new Date(person.enrolmentDate);
        var credentials = {
          'username': person.username,
          'password': person.password


        };

        var formData={
          firstName: person.firstName,
          lastName: person.lastName,
          gender: person.gender,
          enrolmentDate: [enrolmentDate.getFullYear(),enrolmentDate.getMonth()+1,enrolmentDate.getDate()],
          birthDate:[birthDate.getFullYear(),birthDate.getMonth()+1,birthDate.getDate()],
          credentials: credentials

        };

        dataservice.postItem('POST', 'http://localhost:8080/api/persons/', formData, 'application/json').success(handleSuccess);
      }else{
        $scope.errmsg = "Fill in valid data!";
        console.log("Not valid");
      }

      $scope.selectPerson = function (person) {
        $http.get(person._links.self.href).success(function (data) {
          $scope.selectedPerson = data;
        });

      }}}







