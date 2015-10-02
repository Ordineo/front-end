angular.module('empApp')
  .controller('SkillCompetencesCtrl', function ($scope, SkillFactory, SkillCompetenceFactory, DataService, $log) {
    $log.info('SkillCompetencesCtrl loaded');

    $scope.skills = SkillFactory.all();

  }
);
