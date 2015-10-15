angular.module('oraj360')
  .directive('aLittleAboutMe', aLittleAboutMe)
  .directive('certificates', certificates)
  .directive('interests', interests);

function aLittleAboutMe() {
  var directive = {
    link: link,
    templateUrl: 'views/alittleaboutme.html',
    restrict: 'EA',
    controller: 'ProfileCtrl'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function certificates() {
  var directive = {
    link: link,
    templateUrl: 'views/certificates.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function interests() {
  var directive = {
    link: link,
    templateUrl: 'views/interests.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
