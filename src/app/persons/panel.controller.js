(function () {
  'use strict';

  angular.module('oraj360')
    .controller('PanelCtrl', PanelCtrl);
  PanelCtrl.$inject = ['$scope', 'PersonFactory', 'persons', 'person', '$location'];

  function PanelCtrl($scope, PersonFactory, persons, person, $location) {

    var peeps = [];
    var persona = person;

    $scope.thePersons = [];


    $scope.goToProfile = function (href) {

      var parts = splitLink(href);


      $location.path('/search/' + parts);

    };


    $scope.persons = persons;


    $scope.joinUnit = function (selected) {

      console.log(selected);

      PersonFactory.addPersonToReviewer(selected);
    };

    $scope.toggleSearch = function (element) {
      $scope.showSearch = !$scope.showSearch;
    };
  }
})();
