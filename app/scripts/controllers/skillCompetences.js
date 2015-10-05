angular.module('empApp')
  .controller('SkillCompetencesCtrl', function ($scope, SkillFactory, SkillCompetenceFactory, PersonFactory, $log) {
    $log.info('SkillCompetencesCtrl loaded');

    updateList();

    $scope.save = function (skillCompetence) {
      console.log('Adding Skill Competence to current user');
      skillCompetence.skill = skillCompetence.skill._links.self.href;
      skillCompetence.person = window.sessionStorage.getItem("id");
      SkillCompetenceFactory.add(skillCompetence, updateList);
      $scope.skillCompetence = null;


    };

    $scope.remove = function (href) {
      SkillCompetenceFactory.remove(href, updateList);
    };


    SkillFactory.getSkills(function (response) {
      $scope.skills = response.data._embedded.skills;
    });


    PersonFactory.getPerson().success(function (data) {
      $scope.person = data;
    });


    function updateList() {
      $scope.skillCompetences = SkillCompetenceFactory.all();
    }

  }
);
