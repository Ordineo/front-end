angular.module('oraj360')
  .directive('skillset', skillset)


function skillset() {
  var directive = {
    link: link,
    templateUrl: 'views/skillCompetences.html',
    controller: SkillCompetenceCtrl,
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
