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



    $scope.settings = {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      enrolmentDate: Date.now(),
      birthDate: Date.now() + 9999999
    }

    $http.get
  });
