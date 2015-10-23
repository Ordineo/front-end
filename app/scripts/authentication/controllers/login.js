(function () {

  'use strict';

  angular.module('oraj360').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$log', '$http', '$location', 'AuthenticateFactory', '$route', 'RoleService'];

  function LoginCtrl($scope, $log, $http, $location, AuthenticateFactory, $route, RoleService) {


    $log.info('LoginCtrl loaded');
    if (window.sessionStorage.getItem('logged')) {
      $location.path('/about');
    }
    $scope.logout = function () {
      window.sessionStorage.clear();
      AuthenticateFactory.setAuthorized(false);
      window.location.reload();
      $route.reload();
      $location.path('/login');
    };

    $scope.loginCredentials = function () {
      AuthenticateFactory.setAuthorized(true);
      window.sessionStorage.setItem('id', $scope.userData.username);
      if (AuthenticateFactory.isAuthorized()) {
        window.sessionStorage.setItem('logged', true);
        var id = window.sessionStorage.getItem('id');
        checkMyRoles(id);
        window.location.reload();
      }
    };


    function checkMyRoles(personId) {
      RoleService.getApplicationRoleOfPerson(personId).then(function (data) {
        data.forEach(function (role) {
          switch (role.name) {
            case 'admin':
              window.sessionStorage.setItem('role', 'admin');
              break;
            case 'hero':
              window.sessionStorage.setItem('role', 'hero');
              break;
            case 'user':
              window.sessionStorage.setItem('role', 'user');
          }
        })
      }, function (response) {
        console.log(response.status);

      });

    }
  }
})();
