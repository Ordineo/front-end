angular.module('oraj360')
.directive('learning', learning);

function learning() {
  var directive = {
    link: link,
    templateUrl: 'app/timeline/learning.html',
    restrict: 'E',
    controller: 'DashboardCtrl'
  };
  return directive;

  function link (scope, element, attrs) {
    /* */
  }
}
