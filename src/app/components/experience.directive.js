angular.module('oraj360')
  .directive('experience', experience);

function experience() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/experience.html',
    restrict: 'E',
    controller: 'DashboardCtrl'
  };
  return directive;

  function link (scope, element, attrs) {
    /* */
  }
}
