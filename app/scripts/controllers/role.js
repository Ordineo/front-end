'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:PersonsCtrl
 * @description
 * # PersonsCtrl
 * Controller of the frontendApp
 */
angular.module('empApp')
    .controller('RoleCtrl',RoleCtrl);
RoleCtrl.$inject = ['$scope', '$log', 'dataservice', 'RoleService', '$location', 'Restangular', 'roles', 'avroles', 'persons', 'PersonFactory'];

function RoleCtrl($scope, $log, dataservice, RoleService, $location, Restangular, roles, avroles, persons, PersonFactory) {


  console.log(roles);

  if (roles == 404) {
    $scope.message = "You have no roles yet! Add some roles to your collection!"
  } else {
    $scope.roles = roles;
  }

  $scope.persons = persons;

  console.log(persons);

  $scope.avroles = avroles;
  $scope.deleteRole = function (href) {

    var parts = [];
    console.log(href);
    parts = href.split("/", 6);

    console.log(parts[5]);

    RoleService.deleteRole(window.sessionStorage.getItem('id'), parts[5]);


  };

  $scope.addRole = function () {

    var roleId = splitLink($scope.rolling._links.self.href);

    RoleService.addRoleToPerson($scope.personId, roleId).then(function (data) {
      RoleService.findRolesForOther($scope.personId).then(function (data) {
        $scope.otherRoles = data;
      })


    });

  };

  var splitLink = function (href) {

    var parts = [];
    var link = href;
    parts = link.split("/", 6);

    return parts[5];


  };
  $scope.selectRole = function () {

    $scope.roleSelected = true;
  };

  $scope.removeRoleOfOther = function (href) {

    var roleId = splitLink(href);

    RoleService.deleteRole($scope.personId, roleId).then(function (data) {
      RoleService.findRolesForOther($scope.personId).then(function (data) {
        $scope.otherRoles = data;
      })
    });


  };

  $scope.selectPerson = function () {

    $scope.namePerson = $scope.selectedItem.firstName;


    var parts = [];
    var href = $scope.selectedItem._links.self.href;
    console.log();
    parts = href.split("/", 6);

    $scope.personId = parts[5];
    console.log(parts[5]);


    RoleService.findRolesForOther(parts[5]).then(function (data) {
      $scope.selected = true;
      $scope.otherRoles = data;
    });


  };

  /*var roles = Restangular.all('roles');

   roles.getList().then(function (roles) {

   $scope.roles = roles;
   });*/

  $log.info('RoleCtrl loaded');
  $log.info();


}




