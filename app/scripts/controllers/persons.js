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
PersonsCtrl.$inject = ['$scope', '$log', '$http', '$location', 'PersonFactory', 'CustomerFactory', 'dataservice', '$cookies'];

function PersonsCtrl($scope, $log, $http, $location, PersonFactory, CustomerFactory, dataservice, $cookies) {
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

        dataservice.postItem('POST', 'http://localhost:9900/api/persons/', formData, 'application/json').success(handleSuccess);
      }else{
        $scope.errmsg = 'Fill in valid data!';
        console.log('Not valid');
      }
    };

  $scope.makeAdmin = function () {
    var formData = {
      name: 'admin',
      isFunctional: false
    };

    var handleSuccess = function (data, status, headers) {
      console.log(data);

      $scope.isAdmin = true;

      var handleGetRole = function (data, status, headers) {

        var dataForm = {
          name: data.name,
          isFunctional: data.functional
        };

        dataservice.postItem('POST', 'http://localhost:9900/api/persons/RoleToPerson/' + id, dataForm, 'application/json');

      };

      dataservice.getItem(headers('Location')).success(handleGetRole);
    };
    dataservice.postItem('POST', 'http://localhost:9900/api/roles', formData, 'application/json').success(handleSuccess);


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
      $scope.selectedPersonsCoaches = [];

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

      var handleSuccessCoachesFromPerson = function(data, status) {
        for (var i = 0; i < data._embedded.persons.length; i++) {
          $scope.selectedPersonsCoaches.push(data._embedded.persons[i]);
        }
        console.log('COACHES FROM PERSON RETRIEVED');
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

      //Retrieve coaches from person
      PersonFactory.getCoachesFromPerson(person).success(handleSuccessCoachesFromPerson);

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

  $scope.addCoachToPerson = function(person) {
    PersonFactory.addCoachToPerson(person);
  }
}
angular.module('empApp')
  .factory('PersonRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');

      RestangularConfigurer.setRestangularFields({
        selfLink: 'self.link'
      });

      RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
          extractedData = data._embedded.roleResources;

          if (extractedData == null) {
            extractedData = data._embedded.persons;
          }
        } else {
          extractedData = null;
        }
        return extractedData;
      });

    });
  });
