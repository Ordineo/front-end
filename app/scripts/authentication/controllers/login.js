(function () {

  'use strict';

  angular.module('oraj360').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$http', '$location', 'AuthenticateFactory', '$route'];

  function LoginCtrl($scope, $http, $location, AuthenticateFactory, $route) {

    if (AuthenticateFactory.isAuthorized()) {
      $scope.isLogged = true;
      checkMyRoles();
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
          window.sessionStorage.setItem("id", headers('Location'));
          if (AuthenticateFactory.isAuthorized()) {
            $route.reload();
            window.location.reload();
            $location.path('/roles');
          }
        }
      };
      var handleError = function (data, status, headers) {
        $scope.errmsg = data.message;
        $scope.invalid = true;
      };
      AuthenticateFactory.getLogin(credentials).success(handleSuccess).error(handleError);
    };

    //Check my roles
    function checkMyRoles() {
      var bum = 'Bum';
      var resourceManager = 'Resource Manager';
      var competenceLeader = 'Competence Leader';
      var practiceManager = 'Practice Manager';
      var coach = 'Coach';
      var consultant = 'Consultant';
      var seniorConsultant = 'Senior Consultant';

      $http.get('http://localhost:9900/api/persons/' + window.sessionStorage.getItem('id') + '/roles').success(function (data) {
        for (var i = 0; i < data._embedded.roles.length; i++) {
          switch (data._embedded.roles[i].name) {
            case bum:
              window.sessionStorage.setItem('reviewer', bum);
              window.sessionStorage.setItem('admin', true);
              $scope.isAdmin = true;
              break;
            case resourceManager:
              window.sessionStorage.setItem('reviewer', resourceManager);
              window.sessionStorage.setItem('admin', true);
              $scope.isAdmin = true;
              break;
            case competenceLeader:
              window.sessionStorage.setItem('reviewer', competenceLeader);
              window.sessionStorage.setItem('hero', true);
              $scope.isHero = true;
              break;
            case practiceManager:
              window.sessionStorage.setItem('reviewer', practiceManager);
              window.sessionStorage.setItem('hero', true);
              $scope.isHero = true;
              break;
            case coach:
              window.sessionStorage.setItem('reviewer', coach);
              window.sessionStorage.setItem('hero', true);
              $scope.isHero = true;
              break;
            case consultant:
              window.sessionStorage.setItem('reviewer', consultant);
              window.sessionStorage.setItem('user', true);
              break;
            case seniorConsultant:
              window.sessionStorage.setItem('reviewer', seniorConsultant);
              window.sessionStorage.setItem('user', true);
              break;
          }
        }
      });
    }
  }
})();
