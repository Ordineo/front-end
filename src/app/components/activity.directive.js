angular.module('oraj360')
  .directive('activity', experience);

function experience() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/activity.html',
    restrict: 'E',
    controller: 'DashboardCtrl'
  };
  return directive;

  function link (scope, element, attrs) {
    /* */
  }
}
