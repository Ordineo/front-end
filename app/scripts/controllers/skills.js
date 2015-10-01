'use strict';

angular.module('empApp')
  .controller('SkillsCtrl', function ($scope, $modal, SkillFactory, DataService, $log) {
    $scope.isNameError = false;

    $log.info('SkillsCtrl loaded');
    $scope.skills = SkillFactory.all();

    $scope.remove = function (href) {
      SkillFactory.remove(href, updateList);
    };

    $scope.save = function (newSkill) {

      if (!newSkill || newSkill.name.trim().length == 0) {
        console.log(newSkill);
        $scope.isNameError = true;

      } else {
        if (newSkill._links) {
          SkillFactory.edit(newSkill, updateList);
          buttonFlip("Add");

        } else {
          SkillFactory.add(newSkill, updateList);

        }

        $scope.skill = null;

      }
    };

    function buttonFlip(state) {
      var button = angular.element.find("#skillSubmit").pop();
      button.innerText = state;
      $scope.isNameError = false;

    }

    $scope.setSelected = function (skill) {
      buttonFlip("Edit");
      $scope.skill = skill;
    };

    function updateList() {
      $scope.skills = SkillFactory.all();
    }

  });
