angular.module('oraj360')
.directive('learning', learning);

function learning() {
  var directive = {
    link: link,
    templateUrl: 'views/learning.html',
    restrict: 'E',
    controller: 'DashboardCtrl'
  };
  return directive;

  function link (scope, element, attrs) {
    /* */
  }
}
