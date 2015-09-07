'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the empApp
 */
angular.module('empApp')
  .controller('ProfileCtrl', function ($http, $scope, $log) {

    $log.info('ProfileCtrl loaded');
    $scope.errmsg = "hello";

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    $http.get('http://localhost:8080/api/persons/' + window.sessionStorage.getItem("username")).success(function (data) {
      console.log("GOT IT" + data);
      console.log(data);

      $scope.username = data.username;
      $scope.firstName = data.firstName;
      $scope.lastName = data.lastName;
      $scope.gender = data.gender;
      $scope.birthDate = data.birthDate;
      $scope.enrolmentDate = data.enrolmentDate;
    });
  });
