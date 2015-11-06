'use strict';

angular.module('oraj360')
  .controller('SkillsCtrl', function ($scope, SkillFactory, $log) {
    $scope.isNameError = false;

    $log.info('SkillsCtrl loaded');
    $scope.skills = SkillFactory.all();


    $scope.skillCategories = function () {
      return SkillFactory.getSkillCategories();
    };

    $scope.remove = function (href) {
      SkillFactory.remove(href, updateList);
    };

    $scope.save = function (_skill) {
      console.log(_skill);

      if (!_skill || _skill.name.trim().length === 0) {
        console.log('Error in name: ' + _skill);
        $scope.isNameError = true;

      } else {
        if (_skill._links) {
          SkillFactory.edit(_skill, updateList);
          buttonFlip('Add');

        } else {
          SkillFactory.add(_skill, updateList);

        }

        $scope.skill = null;

      }
    };

    function buttonFlip(state) {
      var button = angular.element.find('#skillSubmit').pop();
      button.innerText = state;
      $scope.isNameError = false;

    }

    $scope.setSelected = function (skill) {
      if (skill === $scope.skill) {
        buttonFlip('Add');
        $scope.skill = null;
      } else {
        buttonFlip('Edit');
        $scope.skill = skill;
      }
    };

    function updateList() {
      $scope.skills = SkillFactory.all();
    }

  });

