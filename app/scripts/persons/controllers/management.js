'use strict';

angular.module('oraj360')
  .controller('ManagementCtrl', ManagementCtrl);
ManagementCtrl.$inject = ['$scope', 'PersonFactory', '$filter', 'persons', 'person'];

function ManagementCtrl($scope, PersonFactory, $filter, persons, person) {
  var peeps = [];
  var persona = person;

  if (persons == 404) {
    $scope.message = 'You dont have any descendants';
  }

  var filterPersons = function (list) {
    list.forEach(function (person) {
      if (person.unit === persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
        peeps.push(person);
      }
    });
    $scope.persons = peeps;
  };

  filterPersons(persons);

  var splitLink = function (href) {
    var parts = [];
    parts = href.split("/", 6);
    return parts[5];
  };


  $scope.joinUnit = function (selected) {
    var personId = splitLink(selected);

    PersonFactory.addPersonToReviewer(personId).then(function (data) {
      PersonFactory.getAll().then(function (data) {
        filterPersons(data);
      })
    });
  };

  $scope.toggleSearch = function (element) {
    $scope.showSearch = !$scope.showSearch;
  };


}
