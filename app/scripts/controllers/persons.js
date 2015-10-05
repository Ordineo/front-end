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
PersonsCtrl.$inject =['$scope', '$log', '$http', '$location', 'PersonFactory', 'RoleFactory', 'CustomerFactory', 'dataservice','$cookies'];

function PersonsCtrl ($scope, $log, $http, $location, PersonFactory, RoleFactory, CustomerFactory, dataservice,$cookies) {
  $log.info('PersonsCtrl loaded');

    $scope.validate = function (person) {
      console.log('Validating person...');





      var handleSuccess = function (data, status) {
        console.log('Person created');

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
        $scope.errmsg = 'Fill in valid data!';
        console.log('Not valid');
      }
    };

  $scope.selectedPersonsApplicationRoles = [];
  $scope.selectedPersonsFunctionalRoles = [];
  $scope.selectPerson = function (person) {
    $http.get(person._links.self.href).success(function (data) {
      $scope.selectedPerson = data;
      $scope.selectedPersonsFunctionalRoles = [];
      $scope.selectedPersonsCustomers = [];
      $scope.allCustomers = [];
      $scope.selectedPersonsBums = [];
      $scope.selectedPersonsCLs = [];
      $scope.selectedPersonsPMs = [];

      var handleSuccessApplicationRoles = function(data, status) {
        for (var i = 0; i < data._embedded.roleResources.length; i++) {
          $scope.selectedPersonsApplicationRoles.push(data._embedded.roleResources[i]);
        }
        console.log('APPLICATION ROLES FROM PERSON RETRIEVED');
      };

      var handleSuccessFunctionalRoles = function(data, status) {
        for (var i = 0; i < data._embedded.roleResources.length; i++) {
          $scope.selectedPersonsFunctionalRoles.push(data._embedded.roleResources[i]);
        }
        console.log('FUNCTIONAL ROLES FROM PERSON RETRIEVED');
      };

      var handleSuccessCustomers = function(data, status) {
        for (var i = 0; i < data._embedded.customers.length; i++) {
          $scope.allCustomers.push(data._embedded.customers[i]);
        }
        console.log('ALL CUSTOMERS RETRIEVED');
      };

      var handleSuccessCustomersFromPerson = function(data, status) {
        for (var i = 0; i < data._embedded.customers.length; i++) {
          $scope.selectedPersonsCustomers.push(data._embedded.customers[i]);
        }
        console.log('CUSTOMERS FROM PERSON RETRIEVED');
      };

      var handleSuccessBumsFromPerson = function(data, status) {
        for (var i = 0; i < data._embedded.persons.length; i++) {
          $scope.selectedPersonsBums.push(data._embedded.persons[i]);
        }
        console.log('BUMS FROM PERSON RETRIEVED');
      };

      var handleSuccessCompetenceLeadersFromPerson = function(data, status) {
        for (var i = 0; i < data._embedded.persons.length; i++) {
          $scope.selectedPersonsCLs.push(data._embedded.persons[i]);
        }
        console.log('COMPETENCE LEADERS FROM PERSON RETRIEVED');
      };

      var handleSuccessPracticeManagersFromPerson = function(data, status) {
        for (var i = 0; i < data._embedded.persons.length; i++) {
          $scope.selectedPersonsPMs.push(data._embedded.persons[i]);
        }
        console.log('PRACTICE MANAGERS FROM PERSON RETRIEVED');
      };

      //PersonFactory.getApplicationRolesFromPerson(data).success(handleSuccessApplicationRoles);
      PersonFactory.getFunctionalRolesFromPerson(data).success(handleSuccessFunctionalRoles);

      //Retrieve all customers
      CustomerFactory.getCustomers().success(handleSuccessCustomers);

      //Retrieve customers from person
      PersonFactory.getCustomersFromPerson(person).success(handleSuccessCustomersFromPerson);

      //Retrieve bums from person
      PersonFactory.getBumsFromPerson(person).success(handleSuccessBumsFromPerson);

      //Retrieve competence leaders from person
      PersonFactory.getCompetenceLeadersFromPerson(person).success(handleSuccessCompetenceLeadersFromPerson);

      //Retrieve practice managers from person
      PersonFactory.getPracticeManagersFromPerson(person).success(handleSuccessPracticeManagersFromPerson);
      console.log(person);
    });
  };

  $scope.persons = PersonFactory.getAll();

  $scope.remove = function(href, index) {
    PersonFactory.remove(href);
    $scope.persons.splice(index, 1);
  };

  $scope.updatePerson = function(person) {
    //PersonFactory.updatePerson(person);

    $.ajax({
      type: 'PUT',
      url: person._links.self.href,
      data: JSON.stringify(person),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function() {
        console.log('PERSON UPDATED');
      }
    });
  };

  $scope.allFunctionalRoles = RoleFactory.getAllFunctionalRoles();
  $scope.selectedRole = '';

  $scope.addFunctionalRoleToPerson = function() {
    console.log($scope.selectedRole);
    PersonFactory.addFunctionalRoleToPerson($scope.selectedPerson._links.self.href + '/roles', $scope.selectedRole);
  };

  $scope.deleteFunctionalRoleFromPerson = function(selectedPerson, selectedPersonsFunctionalRole) {
    PersonFactory.deleteFunctionalRoleFromPerson(selectedPerson, selectedPersonsFunctionalRole);
  };

  $scope.allCustomers = CustomerFactory.getCustomers();
  $scope.addCustomerToPerson = function() {
    PersonFactory.addCustomerToPerson($scope.selectedPerson, JSON.parse($scope.selectedCustomer));
  };

  $scope.deleteCustomerFromPerson = function(selectedPerson, selectedPersonsCustomer) {
    PersonFactory.deleteCustomerFromPerson(selectedPerson, selectedPersonsCustomer);
  };

  $scope.addBumToPerson = function(person) {
    PersonFactory.addBumToPerson(person);
  };

  $scope.addCompetenceLeaderToPerson = function(person) {
    PersonFactory.addCompetenceLeaderToPerson(person);
  };

  $scope.addPracticeManagerToPerson = function(person) {
    PersonFactory.addPracticeManagerToPerson(person);
  };
}
