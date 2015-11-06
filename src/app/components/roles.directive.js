angular.module('oraj360')
  .directive('roles', roles);

function roles() {
  var directive = {
    link: link,
    templateUrl: 'app/roles/roles.html',
    restrict: 'E',
    controller: 'RoleCtrl'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
