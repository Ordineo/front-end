(function () {

  'use strict';

  angular.module('oraj360').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$log', '$http', '$location', 'AuthenticateFactory', '$route', 'RoleService'];

  function LoginCtrl($scope, $log, $http, $location, AuthenticateFactory, $route, RoleService) {


    $log.info('LoginCtrl loaded');
    if (window.sessionStorage.getItem('logged')) {
      console.log('ejehe');
      $scope.isLogged = true;
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
      var credentials = {
        'username': $scope.userData.username,
        'password': $scope.userData.password
      };
      var handleSuccess = function (data, status, headers, config) {

        if (headers('Location') === null) {
          $scope.invalid = true;
          $scope.errmsg = "Server is not responding, please come back later";
        }
        else {
          console.log("Login successful");
          AuthenticateFactory.setAuthorized(true);
          window.sessionStorage.setItem('id', headers('Location'));
          if (AuthenticateFactory.isAuthorized()) {
            window.sessionStorage.setItem('logged', true);
            var id = window.sessionStorage.getItem('id');
            checkMyRoles(id);
            setTimeout(function () {
              window.location.reload();

            }, 1000)


          }
        }
      };
      var handleError = function (data, status, headers) {
        $scope.errmsg = data.message;
        $scope.invalid = true;
      };
      AuthenticateFactory.getLogin(credentials).success(handleSuccess).error(handleError);
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
