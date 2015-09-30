'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the empApp
 */
angular.module('empApp')
  .controller('SettingsCtrl',SettingCtrl);
SettingCtrl.$inject = ['$scope','$log','$modal', '$timeout', 'dataservice'];

function SettingCtrl ($scope, $log, $modal, $timeout, dataservice) {
    $log.info('SettingsCtrl loaded');

    $scope.modalPasswordReset = function() {
      $scope.modal = $modal.open({
        animation: false,
        templateUrl: 'passwordResetModalContent',
        controller: 'SettingsCtrl',
        size: 'sm',
        scope: $scope
      });
      $scope.modal.result.then(function (message) {
        $log.info(message);
      }, function() {
        $log.info('Modal dismissed');
      });

      $scope.cancelModal = function()  {
        $scope.modal.dismiss('cancel');
      };
    };

  $scope.resetPassword = function(password) {

    var id = window.sessionStorage.getItem("id");
    var userData  = {
      'oldPassword' : password.oldPassword,
      'newPassword' : password.newPassword
    };

    $scope.passwordChanged = false;
    $scope.passwordWrong = false;

    var handleSuccess = function(data) {
      $log.info("Password changed");
      $scope.passwordChanged = true;

      $timeout(function() {
        $scope.modal.close();
      }, 1500);
    };
    var handleError = function() {
      $log.info("Current password not correct");
      $scope.passwordWrong = true;
    }

    dataservice.postItem('POST', 'http://localhost:8080/api/persons/' + id + '/settings/resetPassword', userData, 'application/json').success(handleSuccess).error(handleError);
  }

  };
