angular.module('oraj360')
  .directive('aLittleAboutMe', aLittleAboutMe);

function aLittleAboutMe() {
  var directive = {
    link: link,
    templateUrl: 'views/alittleaboutme.html',
    restrict: 'E',
    controller: 'ProfileCtrl'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
