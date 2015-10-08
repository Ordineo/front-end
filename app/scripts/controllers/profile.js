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

ProfileCtrl.$inject = ['$scope', '$modal', '$log', '$http', '$location', 'dataservice', 'PersonFactory', 'SkillFactory', 'SkillCompetenceFactory', 'myDetails', 'myFunctionalRoles'];

function ProfileCtrl($scope, $modal, $log, $http, $location, dataservice, PersonFactory, SkillFactory, SkillCompetenceFactory, myDetails, myFunctionalRoles) {
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

  $scope.myDetails = myDetails;

  //-----
  //Roles
  //-----

  $scope.myFunctionalRoles = myFunctionalRoles.data._embedded.roleResources;

  //---------
  //Customers
  //---------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCustomers = true;
          PersonFactory.getMyCustomers().success(function(data, status) {
            $scope.myCustomers = data._embedded.customers;
          });
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
          PersonFactory.getMyBusinessUnitManagers().success(function(data, status) {
            $scope.myBusinessUnitManagers = data._embedded.persons;
          });
          break;
  }

  //------------------
  //Competence leaders
  //------------------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCompetenceLeaders = true;
          PersonFactory.getMyCompetenceLeaders().success(function(data, status) {
            $scope.myCompetenceLeaders = data._embedded.persons;
          });
          break;
  }

  //-----------------
  //Practice managers
  //-----------------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasPracticeManagers = true;
          PersonFactory.getMyPracticeManagers().success(function(data, status) {
            $scope.myPracticeManagers = data._embedded.persons;
          });
          break;
  }

  //-------
  //Coaches
  //-------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCoaches = true;
          PersonFactory.getMyCoaches().success(function(data, status) {
            $scope.myCoaches = data._embedded.persons;
          });
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
          PersonFactory.getPersonsOfReviewer().then(function(data, status) {
            $scope.myDescendants = data;
          });
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
