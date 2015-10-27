angular.module('oraj360')
  .directive('skillcompetence', skillcompetence)


function skillcompetence() {
  var directive = {
    link: link,
    templateUrl: 'app/skills/skillCompetences.html',
    controller: SkillCompetenceCtrl,
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
