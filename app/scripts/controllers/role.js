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
RoleCtrl.$inject = ['$scope', '$log', 'dataservice', 'RoleService', '$location', 'Restangular', 'roles', 'avroles'];

function RoleCtrl($scope, $log, dataservice, RoleService, $location, Restangular, roles, avroles) {


  console.log(roles);

  if (roles == 404) {
    $scope.message = "You have no roles yet! Add some roles to your collection!"
  } else {
    $scope.roles = roles;
  }


  $scope.avroles = avroles;
  $scope.deleteRole = function (href) {

    var parts = [];
    console.log(href);
    parts = href.split("/", 6);

    console.log(parts[5]);

    RoleService.deleteRole(parts[5]);


  };

  /*var roles = Restangular.all('roles');

   roles.getList().then(function (roles) {

   $scope.roles = roles;
   });*/

  $log.info('RoleCtrl loaded');
  $log.info();


}




