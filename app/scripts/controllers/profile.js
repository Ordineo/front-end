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

  var id = window.sessionStorage.getItem("id");
  if (!$scope.isAdmin) {
    $scope.isAdmin = false;
  }

  $scope.makeAdmin = function () {

    var formData = {
      name: 'admin',
      isFunctional: false
    };

    var handleSuccess = function (data, status, headers) {
      console.log(data);

      $scope.isAdmin = true;

      //dataservice.postItem('POST','http://localhost:8080/api/persons/RoleToPerson/'+id,);

      var handleGetRole = function (data, status, headers) {

        var dataForm = {
          name: data.name,
          isFunctional: data.functional
        };

        dataservice.postItem('POST', 'http://localhost:8080/api/persons/RoleToPerson/' + id, dataForm, 'application/json');

      };

      dataservice.getItem(headers('Location')).success(handleGetRole);
    };
    dataservice.postItem('POST', 'http://localhost:8080/api/roles', formData, 'application/json').success(handleSuccess);


  };

  // v NEEDS REFACTORING v

  if ($scope.isBum === true) {
    $scope.myUsers = [];
    var handleSuccessUsersFromPerson = function (data, status) {
      for (var i = 0; i < data._embedded.persons.length; i++) {
        $scope.myUsers.push(data._embedded.persons[i]);
      }
      console.log('MY USERS RETRIEVED');
    };

    //Retrieve users from person
    PersonFactory.getUsersFromPerson().success(handleSuccessUsersFromPerson);
  }

  if ($scope.isCompetenceLeader === true) {
    $scope.myUsers = [];
    var handleSuccessUsersFromCompetenceLeader = function (data, status) {
      for (var i = 0; i < data._embedded.persons.length; i++) {
        $scope.myUsers.push(data._embedded.persons[i]);
      }
      console.log('MY USERS RETRIEVED');
    };
    //Retrieve users from competence leader
    PersonFactory.getUsersFromCompetenceLeader().success(handleSuccessUsersFromCompetenceLeader);
  }

  if ($scope.isPracticeManager === true) {
    $scope.myUsers = [];
    var handleSuccessUsersFromPracticeManager = function (data, status) {
      for (var i = 0; i < data._embedded.persons.length; i++) {
        $scope.myUsers.push(data._embedded.persons[i]);
      }
      console.log('MY USERS RETRIEVED');
    };
    //Retrieve users from practice manager
    PersonFactory.getUsersFromPracticeManager().success(handleSuccessUsersFromPracticeManager);
  }

  if ($scope.isCoach === true) {
    $scope.myUsers = [];
    var handleSuccessUsersFromCoach = function (data, status) {
      for (var i = 0; i < data._embedded.persons.length; i++) {
        $scope.myUsers.push(data._embedded.persons[i]);
      }
      console.log('MY USERS RETRIEVED');
    };
    //Retrieve users from practice manager
    PersonFactory.getUsersFromCoach().success(handleSuccessUsersFromCoach);
  }

  //^ NEEDS REFACTORING ^

  //-----------------
  //Skill competences
  //-----------------

  

  //-----------
  //Credentials
  //-----------

  $scope.modifyMyCredentials = function() {
    window.alert('Oops, Looks like we didn\'t find any implementation yet!');
  };
}
