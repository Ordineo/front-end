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

  PersonFactory.getMyDetails(null).then(function(data, status) {
    $scope.myDetails = data;
  });

  //-----
  //Roles
  //-----

  PersonFactory.getMyFunctionalRoles(null).then(function(data, status) {
    $scope.myFunctionalRoles = data;
  });

  //---------
  //Customers
  //---------

  switch (reviewer) {
    case consultant:
    case seniorConsultant:
          $scope.hasCustomers = true;
          PersonFactory.getMyCustomers(null).then(function(data, status) {
            $scope.myCustomers = data;
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
          PersonFactory.getMyBusinessUnitManagers(null).then(function(data, status) {
            $scope.myBusinessUnitManagers = data;
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
          PersonFactory.getMyCompetenceLeaders(null).then(function(data, status) {
            $scope.myCompetenceLeaders = data;
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
          PersonFactory.getMyPracticeManagers(null).then(function(data, status) {
            $scope.myPracticeManagers = data;
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
          PersonFactory.getMyCoaches(null).then(function(data, status) {
            $scope.myCoaches = data;
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

  var personId = window.sessionStorage.getItem('id');
  updateList();

  $scope.save = function (skillCompetence) {
    console.log('Adding Skill Competence to current user');
    skillCompetence.skill = skillCompetence.skill._links.self.href;
    skillCompetence.person = personId;
    SkillCompetenceFactory.add(skillCompetence, updateList);
    $scope.skillCompetence = null;
  };

  $scope.remove = function (href) {
    SkillCompetenceFactory.remove(href, updateList);
  };

  SkillFactory.getSkills(function (response) {
    $scope.skills = response.data._embedded.skills;
  });

  PersonFactory.getPersonById().then(function (data) {
    $scope.person = data;
  });

  function updateList() {
    $scope.skillCompetences = SkillCompetenceFactory.getSkillCompetenceForPersonId(personId);
  }

  //-----------
  //Credentials
  //-----------

  $scope.modalPasswordChange = function() {
    $scope.modal = $modal.open({
      animation: false,
      templateUrl: 'passwordChangeModalContent',
      controller: 'SettingsCtrl',
      size: 'sm',
      scope: $scope
    });
    $scope.modal.result.then(function (message) {
      $log.info(message);
    }, function() {
      $log.info('Modal dismissed');
    });

    $scope.cancelModal = function()  {
      $scope.modal.dismiss('cancel');
    };
  };

  $scope.changePassword = function(password) {
    var id = window.sessionStorage.getItem("id");
    var userData  = {
      'oldPassword' : password.oldPassword,
      'newPassword' : password.newPassword
    };

    $scope.passwordChanged = false;
    $scope.passwordWrong = false;

    var handleSuccess = function(data) {
      $log.info("Password changed");
      $scope.passwordChanged = true;

      $timeout(function() {
        $scope.modal.close();
      }, 1500);
    };
    var handleError = function() {
      $log.info("Current password not correct");
      $scope.passwordWrong = true;
    };

    dataservice.postItem('POST', 'http://localhost:9900/api/persons/' + id + '/settings/resetPassword', userData, 'application/json').success(handleSuccess).error(handleError);
  }
}
