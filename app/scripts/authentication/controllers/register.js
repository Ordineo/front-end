(function () {
  'use strict';


  angular.module('oraj360')
    .controller('RegisterCtrl', RegisterCtrl);
  RegisterCtrl.$inject = ['$scope', '$location', 'PersonFactory', 'dataservice'];

  function RegisterCtrl($scope, $location, PersonFactory, dataservice) {
    $scope.validate = function (person) {
      console.log('Validating person...');
      var handleSuccess = function (data, status) {
        console.log('Person created');
        $location.path('/login');
      };
      if ($scope.registerForm.$valid) {
        var birthDate = new Date(person.birthDate);
        var enrolmentDate = new Date(person.enrolmentDate);
        var credentials = {
          'username': person.username,
          'password': person.password
        };
        var formData = {
          firstName: person.firstName,
          lastName: person.lastName,
          gender: 'Male',
          enrolmentDate: [enrolmentDate.getFullYear(), enrolmentDate.getMonth() + 1, enrolmentDate.getDate()],
          birthDate: [birthDate.getFullYear(), birthDate.getMonth() + 1, birthDate.getDate()],
          credentials: credentials
        };
        dataservice.postItem('POST', 'http://localhost:9900/api/persons/', formData, 'application/json').success(handleSuccess);
      } else {
        $scope.errmsg = 'Fill in valid data!';
        console.log('Not valid');
      }
    };
  }
})();
