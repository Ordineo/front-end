angular.module('oraj360')
  .directive('aLittleAboutMe', aLittleAboutMe)
  .directive('certificates', certificates)
  .directive('interests', interests)
  .directive('dailyRoute', dailyRoute)
  .directive('skillset', skillset)
  .directive('endorsements', endorsements)
  .directive('workedWithPerson', workedWithPerson)
  .directive('interestingPeople', interestingPeople);

function aLittleAboutMe() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/alittleaboutme.html',
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
    templateUrl: 'app/persons/certificates.html',
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
    templateUrl: 'app/persons/interests.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function dailyRoute() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/dailyroute.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function skillset() {
  var directive = {
    link: link,
    templateUrl: 'app/skills/skillset.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function endorsements() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/endorsements.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function workedWithPerson() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/workedwithperson.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}

function interestingPeople() {
  var directive = {
    link: link,
    templateUrl: 'app/persons/interestingpeople.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
}
