'use strict';

angular.module('empApp').controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject =['$scope', '$log', '$http', '$location','dataservice','AuthenticateFactory','PersonFactory','$route'];

function LoginCtrl($scope, $log, $http, $location,dataservice,AuthenticateFactory,PersonFactory,$route) {

  if(AuthenticateFactory.isAuthorized()){
    $scope.isLogged = true;
    checkRoles();
  }

  $scope.logout = function(){
    window.sessionStorage.clear();
    AuthenticateFactory.setAuthorized(false);
    window.location.reload();
    $route.reload();
    $location.path('/login');
  };

  $scope.login = function(login){
    var credentials = {
      'username': login.username,
      'password': login.password
    };
    var handleSuccess = function (data, status,headers,config) {
      console.log("Login successful");
      AuthenticateFactory.setAuthorized(true);
      window.sessionStorage.setItem("id",headers('Location'));
      if(AuthenticateFactory.isAuthorized()) {
        $route.reload();
        window.location.reload();
        $location.path('/roles');
      }
    };
    var handleError = function(data, status, headers){
      $scope.errmsg = data.message;
      $scope.invalid = true;
    };
    AuthenticateFactory.getLogin(credentials).success(handleSuccess).error(handleError);
  };

  //Check roles when logged in
  function checkRoles() {
    //Application roles
    var admin = 'admin';
    var hero = 'hero';
    var user = 'user';
    //Functional roles
    var bum = 'Bum';
    var competenceLeader = 'Competence Leader';
    var practiceManager = 'Practice Manager';
    var coach = 'Coach';
    var consultant = 'Consultant';
    var seniorConsultant = 'Senior Consultant';
    //Scopes application roles
    $scope.isAdmin = false;
    $scope.isHero = false;
    $scope.isUser = false;
    //Scopes functional roles
    $scope.isBum = false;
    $scope.isCompetenceLeader = false;
    $scope.isPracticeManager = false;
    $scope.isCoach = false;
    $scope.isConsultant = false;
    $scope.isSeniorConsultant = false;

    $http.get('http://localhost:8080/api/persons/' + window.sessionStorage.getItem('id') + '/roles').success(function(data) {
      for (var i = 0; i < data._embedded.roles.length; i++) {
        switch (data._embedded.roles[i].name) {
          case admin:
                $scope.isAdmin = true;
                break;
          case hero:
                $scope.isHero = true;
                break;
          case user:
                $scope.isUser = true;
                break;
          case bum:
                $scope.isBum = true;
                break;
          case competenceLeader:
                $scope.isCompetenceLeader = true;
                break;
          case practiceManager:
                $scope.isPracticeManager = true;
                break;
          case coach:
                $scope.isCoach = true;
                break;
          case consultant:
                $scope.isConsultant = true;
                break;
          case seniorConsultant:
                $scope.isSeniorConsultant = true;
                break;
        }
      }
    });
  }
}
