angular.module('oraj360')
  .controller('SkillCompetenceCtrl', SkillCompetenceCtrl);

function SkillCompetenceCtrl($scope, SkillFactory, SkillCompetenceFactory, PersonFactory, $log, $timeout, $mdToast) {
  $log.info('SkillCompetenceCtrl loaded');

  var personId = window.sessionStorage.getItem('id');
  updateList();

  $scope.save = function (skillCompetence) {
    console.log('Adding Skill Competence to current user');
    if (skillCompetence === undefined) {
      $scope.showUndefinedToast();
    }
    skillCompetence.skill = skillCompetence.skill._links.self.href;
    skillCompetence.person = personId;
    SkillCompetenceFactory.add(skillCompetence).then(function (data) {
      $scope.showAddToast();

      $scope.skillCompetence = null;
      updateList();
    }, function (response) {
      $scope.skillCompetence = null;
      $scope.showErrorToast();
    });
  };

  $scope.getSkill = function (href) {
    console.log(href);
    return SkillCompetenceFactory.findSkillOfCompetence(href)

  };

  $scope.remove = function (competence) {
    console.log(competence);
    SkillCompetenceFactory.remove(competence).then(function (data) {

      $scope.showSimpleToast();
      updateList();


    });

  };

  SkillFactory.getSkills().then(function (data) {
    $scope.skills = data;
  });

  PersonFactory.getMyDetails(personId).then(function (data) {
    $scope.person = data;
  });


  function updateList() {
    SkillCompetenceFactory.getSkillCompetenceForPerson(personId).then(function (data) {

      data.forEach(function (competence) {
        $scope.getSkill(competence._links.skill.href).then(function (skill) {
          competence.skill = skill.name;
        })
      });
      $scope.skillCompetences = data;
    });
  }

  var last = {
    bottom: true,
    top: false,
    left: false,
    right: true
  };
  $scope.toastPosition = angular.extend({}, last);
  $scope.getToastPosition = function () {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function (pos) {
        return $scope.toastPosition[pos];
      })
      .join(' ');
  };
  function sanitizePosition() {
    var current = $scope.toastPosition;
    if (current.bottom && last.top) current.top = false;
    if (current.top && last.bottom) current.bottom = false;
    if (current.right && last.left) current.left = false;
    if (current.left && last.right) current.right = false;
    last = angular.extend({}, current);
  }

  $scope.showErrorToast = function () {
    $mdToast.show(
      $mdToast.simple()
        .content('You cannot add more than one of the same skill!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };
  $scope.showUndefinedToast = function () {
    $mdToast.show(
      $mdToast.simple()
        .content('That competence doesnt exist! Please choose one of the list!!')
        .position($scope.getToastPosition())
        .hideDelay(5000)
    );
  };
  $scope.showAddToast = function () {
    $mdToast.show(
      $mdToast.simple()
        .content('Added a new competence!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };
  $scope.showSimpleToast = function () {
    $mdToast.show(
      $mdToast.simple()
        .content('Removed Successfully!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };



}
