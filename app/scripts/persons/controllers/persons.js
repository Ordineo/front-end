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
PersonsCtrl.$inject = ['$scope', '$log', '$http', '$location', 'PersonFactory', 'CustomerFactory', 'dataservice', '$cookies'];

function PersonsCtrl($scope, $log, $http, $location, PersonFactory, CustomerFactory, dataservice, $cookies) {
  $log.info('PersonsCtrl loaded');

  $scope.validate = function (person) {
    console.log('Validating person...');

    var handleSuccess = function (data, status) {
      console.log('Person created');
      $location.path('/login');
    };

    if ($scope.registerForm.$valid) {
      var birthDate = new Date(person.birthDate);
      var enrolmentDate = new Date(person.enrolmentDate);
      var credentials = {
        'username': person.username,
        'password': person.password
      };

      var formData = {
        firstName: person.firstName,
        lastName: person.lastName,
        gender: 'Male',
        enrolmentDate: [enrolmentDate.getFullYear(), enrolmentDate.getMonth() + 1, enrolmentDate.getDate()],
        birthDate: [birthDate.getFullYear(), birthDate.getMonth() + 1, birthDate.getDate()],
        credentials: credentials

      };

      dataservice.postItem('POST', 'http://localhost:9900/api/persons/', formData, 'application/json').success(handleSuccess);
    } else {
      $scope.errmsg = 'Fill in valid data!';
      console.log('Not valid');
    }
  };

  $scope.selectPerson = function (person) {
    $http.get(person._links.self.href).success(function (data) {
      $scope.selectedPerson = data;
      $scope.selectedPersonsFunctionalRoles = [];
      $scope.selectedPersonsCustomers = [];
      $scope.selectedPersonsBums = [];
      $scope.selectedPersonsCLs = [];
      $scope.selectedPersonsPMs = [];
      $scope.selectedPersonsCoaches = [];
      $scope.allCustomers = [];

      CustomerFactory.getCustomers().success(function (data, status) {
        for (var i = 0; i < data._embedded.customers.length; i++) {
          $scope.allCustomers.push(data._embedded.customers[i]);
        }
      });
    });
  };

  $scope.persons = PersonFactory.getAll();

  $scope.remove = function (href, index) {
    PersonFactory.remove(href);
    $scope.persons.splice(index, 1);
  };

  $scope.updatePerson = function (person) {
    //PersonFactory.updatePerson(person);

    $.ajax({
      type: 'PUT',
      url: person._links.self.href,
      data: JSON.stringify(person),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function () {
        console.log('PERSON UPDATED');
      }
    });
  };

  $scope.selectedRole = '';

  $scope.addFunctionalRoleToPerson = function () {
    console.log($scope.selectedRole);
    PersonFactory.addFunctionalRoleToPerson($scope.selectedPerson._links.self.href + '/roles', $scope.selectedRole);
  };

  $scope.deleteFunctionalRoleFromPerson = function (selectedPerson, selectedPersonsFunctionalRole) {
    PersonFactory.deleteFunctionalRoleFromPerson(selectedPerson, selectedPersonsFunctionalRole);
  };

  $scope.allCustomers = CustomerFactory.getCustomers();
  $scope.addCustomerToPerson = function () {
    PersonFactory.addCustomerToPerson($scope.selectedPerson, JSON.parse($scope.selectedCustomer));
  };

  $scope.deleteCustomerFromPerson = function (selectedPerson, selectedPersonsCustomer) {
    PersonFactory.deleteCustomerFromPerson(selectedPerson, selectedPersonsCustomer);
  };

  $scope.addBumToPerson = function (person) {
    PersonFactory.addBumToPerson(person);
  };

  $scope.addCompetenceLeaderToPerson = function (person) {
    PersonFactory.addCompetenceLeaderToPerson(person);
  };

  $scope.addPracticeManagerToPerson = function (person) {
    PersonFactory.addPracticeManagerToPerson(person);
  };

  $scope.addCoachToPerson = function (person) {
    PersonFactory.addCoachToPerson(person);
  }
}
