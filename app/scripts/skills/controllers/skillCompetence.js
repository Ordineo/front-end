angular.module('oraj360')
  .controller('SkillCompetenceCtrl', SkillCompetenceCtrl);

function SkillCompetenceCtrl($scope, SkillFactory, SkillCompetenceFactory, PersonFactory, $log) {
  $log.info('SkillCompetenceCtrl loaded');

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

  SkillFactory.getSkills().then(function (data) {
    $scope.skills = data;
  });

  PersonFactory.getMyDetails(personId).then(function (data) {
    $scope.person = data;
  });

  function updateList() {
    SkillCompetenceFactory.getSkillCompetenceForPerson(personId).then(function (data) {
      $scope.skillCompetences = data;
    });
  }


}
