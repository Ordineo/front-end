(function () {

  'use strict';

  angular.module('oraj360').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$log', '$http', '$location', 'AuthenticateFactory', '$route', 'RoleService', 'dataservice', '$timeout'];

  function LoginCtrl($scope, $log, $http, $location, AuthenticateFactory, $route, RoleService, dataservice, $timeout) {


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
      window.sessionStorage.setItem('url', 'http://localhost:9900/api/');

      $timeout(function () {
        if (AuthenticateFactory.isAuthorized()) {
          window.sessionStorage.setItem('logged', true);
          var id = window.sessionStorage.getItem('id');
          window.location.reload();
        }
      }, 1000)

    };

  }

}());
