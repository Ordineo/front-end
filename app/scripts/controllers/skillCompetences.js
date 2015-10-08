'use strict';

angular.module('empApp')
  .controller('SkillCompetencesCtrl', function ($scope, SkillFactory, SkillCompetenceFactory, PersonFactory, $log) {
    $log.info('SkillCompetencesCtrl loaded');

    var personId = window.sessionStorage.getItem('id');
    updateList();

    $scope.save = function (skillCompetence) {
      console.log('Adding Skill Competence to current user');
      skillCompetence.skill = skillCompetence.skill._links.self.href;
      skillCompetence.person = personId;
      SkillCompetenceFactory.add(skillCompetence, updateList);
      $scope.skillCompetence = null;
    };

    $scope.remove = function (href) {
      SkillCompetenceFactory.remove(href, updateList);
    };

    SkillFactory.getSkills(function (response) {
      $scope.skills = response.data._embedded.skills;
    });

    PersonFactory.getPersonById(personId).success(function (data) {
      $scope.person = data;
    });

    function updateList() {
      $scope.skillCompetences = SkillCompetenceFactory.getSkillCompetenceForPersonId(personId);
    }

  }
);
