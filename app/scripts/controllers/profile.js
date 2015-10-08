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

ProfileCtrl.$inject = ['$scope', '$modal', '$log', '$http', '$location', 'dataservice', 'PersonFactory', 'SkillFactory', 'SkillCompetenceFactory'];

function ProfileCtrl($scope, $modal, $log, $http, $location, dataservice, PersonFactory, SkillFactory, SkillCompetenceFactory) {
  $log.info('ProfileCtrl loaded');

  var reviewer = window.sessionStorage.getItem('reviewer');
  var bum = 'Bum';
  var resourceManager = 'Resource Manager';
  var competenceLeader = 'Competence Leader';
  var practiceManager = 'Practice Manager';
  var coach = 'Coach';
  var consultant = 'Consultant';
  var seniorConsultant = 'Senior Consultant';

  //----------
  //Details
  //----------

  var handleSuccessMyDetails = function(data, status) {
    $scope.myDetails = data;
  };
  PersonFactory.getMyDetails().success(handleSuccessMyDetails);

  //-----
  //Roles
  //-----

  var handleSuccessMyApplicationRoles = function(data, status) {
    $scope.myApplicationRoles = data._embedded.roleResources;
  };
  var handleSuccessMyFunctionalRoles = function(data, status) {
    $scope.myFunctionalRoles = data._embedded.roleResources;
  };
  PersonFactory.getMyApplicationRoles().success(handleSuccessMyApplicationRoles);
  PersonFactory.getMyFunctionalRoles().success(handleSuccessMyFunctionalRoles);

  //---------
  //Customers
  //---------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCustomers = true;

          var handleSuccessMyCustomers = function(data, status) {
            $scope.myCustomers = data._embedded.customers;
          };
          PersonFactory.getMyCustomers().success(handleSuccessMyCustomers);

          break;
  }

  //----------------------
  //Business unit managers
  //----------------------

  switch (reviewer) {
    case competenceLeader:
    case practiceManager:
    case coach:
    case consultant:
    case seniorConsultant:
          $scope.hasBusinessUnitManagers = true;

          var handleSuccessMyBusinessUnitManagers = function(data, status) {
            $scope.myBusinessUnitManagers = data._embedded.persons;
          };
          PersonFactory.getMyBusinessUnitManagers().success(handleSuccessMyBusinessUnitManagers);

          break;
  }

  //------------------
  //Competence leaders
  //------------------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCompetenceLeaders = true;

          var handleSuccessMyCompetenceLeaders = function(data, status) {
            $scope.myCompetenceLeaders = data._embedded.persons;
          };
          PersonFactory.getMyCompetenceLeaders().success(handleSuccessMyCompetenceLeaders);

          break;
  }

  //-----------------
  //Practice managers
  //-----------------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasPracticeManagers = true;

          var handleSuccessMyPracticeManagers = function(data, status) {
            $scope.myPracticeManagers = data._embedded.persons;
          };
          PersonFactory.getMyPracticeManagers().success(handleSuccessMyPracticeManagers);

          break;
  }

  //-------
  //Coaches
  //-------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
      $scope.hasCoaches = true;

      var handleSuccessMyCoaches = function(data, status) {
        $scope.myCoaches = data._embedded.persons;
      };
      PersonFactory.getMyCoaches().success(handleSuccessMyCoaches);

      break;
  }

  //-----------
  //Descendants
  //-----------

  switch (reviewer) {
    case bum:
    case resourceManager:
    case competenceLeader:
    case practiceManager:
    case coach:
          $scope.hasDescendants = true;

          var handleSuccessMyDescendants = function(data, status) {
            $scope.myDescendants = data;
          };
          PersonFactory.getPersonsOfReviewer().then(handleSuccessMyDescendants);

          break;
  }

  //-----------------
  //Skill competences
  //-----------------

  //Code here

  //-----------
  //Credentials
  //-----------

  $scope.modifyMyCredentials = function() {
    window.alert('Oops, looks like we didn\'t find any implementation yet!');
  };
}
