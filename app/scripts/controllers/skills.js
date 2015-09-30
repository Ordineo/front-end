'use strict';

angular.module('empApp')
  .controller('SkillsCtrl', function ($scope, $modal, SkillFactory, DataService, $log) {

    $log.info('SkillsCtrl loaded');
    $scope.skills = SkillFactory.all();

    $scope.add = function () {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'skillModalContent',
        controller: 'SkillsModalCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function (skill) {
        console.log('Adding skill...');

        if (skill.skillCategory) {
          console.log(skill.skillCategory);
          DataService.postItem('POST', 'http://localhost:8081/api/skillCategories/', skill.skillCategory, 'application/json', function (data,config,headers) {
            skill.skillCategory = headers('location');
            DataService.postItem('POST', 'http://localhost:8081/api/skills/', skill, 'application/json', updateList);

          });
        }else{
          DataService.postItem('POST', 'http://localhost:8081/api/skills/', skill, 'application/json', updateList);
        }


      }, function () {
        console.log('Modal dismissed');
      });
    };


    $scope.remove = function (href) {
      console.log('Removing skill...');
      SkillFactory.remove(href, updateList);
    };

    function updateList() {
      $scope.skills = SkillFactory.all();
    }

  }).controller('SkillsModalCtrl', function ($scope, $modalInstance, $log) {

    $log.info('SkillsModalCtrl loaded');

    $scope.errorMessage = null;

    $scope.ok = function (skill) {
      if (!skill || skill.name.trim().length == 0)
        $scope.errorMessage = "Enter a name";
      else {
        $scope.errorMessage = null;
        $modalInstance.close(skill);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
