(function () {
  'use strict';

  angular.module('oraj360').controller('RoleCtrl', RoleCtrl);

  RoleCtrl.$inject = ['$scope', 'RoleService', 'roles', 'avroles'];

  function RoleCtrl($scope, RoleService, roles, avroles) {

    if (roles == 404) {
    $scope.message = "You have no roles yet! Add some roles to your collection!"
  } else {
    $scope.roles = roles;
  }
    /* if (persons == 404) {
    $scope.msg = "You have no persons under you!";
  } else {
     $scope.persons = "";
     }*/

  if (avroles == 404) {
    $scope.msgroles = "Can't find any available roles";
  } else {
    $scope.avroles = avroles;
  }


  $scope.deleteRole = function (href) {

    var roleId = splitLink(href);
    RoleService.deleteRole(window.sessionStorage.getItem('id'), roleId);
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
    parts = href.split("/", 6);
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
    $scope.personId = splitLink($scope.selectedItem._links.self.href);
    RoleService.findRolesForOther($scope.personId).then(function (data) {
      $scope.selected = true;
      $scope.otherRoles = data;
    }, function (response) {
      $scope.selected = true;
    });
  };


  }


}());
