angular.module('oraj360').directive('inactiveusers', InactiveUsers);


function InactiveUsers() {
  var directive = {
    link: link,
    templateUrl: 'views/inactivewidget.html',
    restrict: 'EA',
    controller: PersonsCtrl,
    bindToController: true

  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
