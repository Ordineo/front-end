'use strict';

angular.module('empApp')
  .controller('SkillsCtrl', function ($scope, $modal, SkillFactory, DataService, $log) {

    $log.info('SkillsCtrl loaded');
    $scope.skills =  SkillFactory.all();

    $scope.add = function () {
      $scope.modal = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'skillModalContent',
        controller: 'SkillsCtrl',
        size: 'lg',
        scope: $scope
      });
      $scope.modal.result.then(function (message) {
        console.log(message);
      }, function () {
        console.log('Modal dismissed');
      });
    };

    $scope.ok = function (skill) {
      console.log('Adding skill...');

      DataService.postItem('POST','http://localhost:8081/api/skills/',skill,'application/json');

      $scope.modal.close();

      };

});
