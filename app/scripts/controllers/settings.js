'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the empApp
 */
angular.module('empApp')
  .controller('SettingsCtrl', function ($scope, $log, $modal) {
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

  });
