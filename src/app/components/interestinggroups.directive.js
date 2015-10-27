angular.module('oraj360')
  .directive('interestingGroups', interestingGroups);


function interestingGroups() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/interestinggroups.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
