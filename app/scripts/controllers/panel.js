'use strict';

angular.module('empApp')
    .controller('PanelCtrl',PanelCtrl);
PanelCtrl.$inject = ['$scope', 'PersonFactory', 'persons', '$filter', 'person'];

function PanelCtrl($scope, PersonFactory, persons, $filter, person) {

  var peeps = [];
  var myPeeps = [];
  var persona = person;
  var myPersons = [];
  var reviewer = window.sessionStorage.getItem('reviewer');

  console.log(persona);
  PersonFactory.getPersonsOfReviewer().then(function (data) {
    myPersons = data;
  });


  var filterPersons = function (list) {

    list.forEach(function (person) {
      switch (reviewer) {
        case 'Bum':
        case 'Resource Manager':
          if (person.unit !== persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
            peeps.push(person);
          }
          break;
        case 'Competence Leader':
        case 'Practice Manager':
        case 'Coach':
          if (person.unit === persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
            peeps.push(person);
          }
          break;
        default:
          $location.path('/profile')
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


        // dataservice.postItem('POST','http://localhost:9900/api/persons/2/bums/1',null,'application/json');

  };

  $scope.toggleSearch = function (element) {
    $scope.showSearch = !$scope.showSearch;
  };


}
