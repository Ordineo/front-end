'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:PersonsCtrl
 * @description
 * # PersonsCtrl
 * Controller of the frontendApp
 */
angular.module('empApp')
  .controller('PersonsCtrl', ['$scope', '$modal', '$log', '$http', '$location', 'PersonFactory', function ($scope, $modal, $log, $http, $location, PersonFactory) {
    $log.info('PersonsCtrl loaded');

    $scope.persons = PersonFactory.all();

    $scope.add = function () {
      $scope.modal = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'userModalContent',
        controller: 'PersonsCtrl',
        size: 'lg',
        scope: $scope
      });
      $scope.modal.result.then(function (message) {
        console.log(message);
      }, function () {
        console.log('Modal dismissed');
      });
    };
      /**
       *     this.firstName = firstName;
       this.lastName = lastName;
       this.gender = gender;
       this.enrolmentDate = enrolmentDate;
       this.birthDate = birthDate;
       */
    $scope.ok = function (person) {
      console.log('Adding person...');


      var birthDate = new Date(person.birthDate);
      var enrolmentDate = new Date(person.enrolmentDate);
      var credentials = {
        'username': person.username,
        'password': person.password

      };

      $http.post('http://localhost:8080/api/persons', {
        firstName: person.firstName,
        lastName: person.lastName,
        gender: person.gender,
        enrolmentDate: [enrolmentDate.getFullYear(),enrolmentDate.getMonth()+1,enrolmentDate.getDate()],
        birthDate:[birthDate.getFullYear(),birthDate.getMonth()+1,birthDate.getDate()],
        credentials: credentials


      }).success(function (data, status, headers) {
        console.log('headers: ' + headers('location'));
        $scope.persons = PersonFactory.update();
        $scope.modal.close('User created');
      });
    };

    $scope.selectPerson = function (person) {
      $http.get(person._links.self.href).success(function (data) {
        $scope.selectedPerson = data;
      });
    };
  }]);
