(function () {
  'use strict';


  angular.module('oraj360')
    .controller('RegisterCtrl', RegisterCtrl);
  RegisterCtrl.$inject = ['$scope', '$location', 'PersonFactory', 'dataservice', '$mdDialog', '$timeout'];

  function RegisterCtrl($scope, $location, PersonFactory, dataservice, $mdDialog, $timeout) {


    function showDialog() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('body')))
          .clickOutsideToClose(true)
          .title('Successfully registered')
          .content('You are successfully registered, you will be redirected to the login page.')
          .ariaLabel('Alert successfully registered')
          .ok('Got it!')
      );
    }

    $scope.validate = function (person) {
      console.log('Validating person...');
      var handleSuccess = function (data, status) {
        console.log('Person created');

        showDialog();
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
