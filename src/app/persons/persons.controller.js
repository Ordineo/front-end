'use strict';

/**
 * @ngdoc function
 * @name oraj360.controller:PersonsCtrl
 * @description
 * # PersonsCtrl
 * Controller of the frontendApp
 */

angular.module('oraj360')
  .controller('PersonsCtrl', PersonsCtrl);
PersonsCtrl.$inject = ['$scope', '$log', '$http', '$location', 'PersonFactory'];

function PersonsCtrl($scope, $log, $http, $location, PersonFactory) {
  $log.info('PersonsCtrl loaded');

  PersonFactory.getAll().then(function (data) {
    $scope.persons = data;
  })

}
