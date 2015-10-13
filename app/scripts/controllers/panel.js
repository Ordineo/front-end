(function () {
  'use strict';

  angular.module('empApp')
    .controller('PanelCtrl', PanelCtrl);
  PanelCtrl.$inject = ['$scope', 'PersonFactory', 'persons', 'person', 'myPersons', '$location'];

  function PanelCtrl($scope, PersonFactory, persons, person, myPersons, $location) {

    var peeps = [];
    var persona = person;

    $scope.thePersons = [];

    var reviewer = window.sessionStorage.getItem('reviewer');

    var splitLink = function (href) {
      var parts = href.split("/", 6);
      return parts[5];
    };

    PersonFactory.getPersonsOfReviewer().then(function (data) {
      $scope.thePersons = data;
    });

    $scope.goToProfile = function (href) {

      var parts = splitLink(href);


      $location.path('/search/' + parts);

    };

    var filterPersons = function (list, secList) {
      list.forEach(function (persono) {
        secList.forEach(function (persa) {
          if (persono.firstName === persa.firstName && persono.lastName === persa.lastName) {
            list = _.without(list, persono);
          }
        })
      });

      list.forEach(function (person) {
        switch (reviewer) {
          case 'Bum':
            if (person.unit !== persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
              peeps.push(person);
            }
            break;
          case 'Resource Manager':
            if (person.unit === persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
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
      return peeps;
    };

    $scope.persons = filterPersons(persons, myPersons);


    $scope.joinUnit = function (selected) {
      var personId = splitLink(selected);
      PersonFactory.addPersonToReviewer(personId).then(function (data) {
        PersonFactory.getAll().then(function (data) {
          persons = data;
          PersonFactory.getPersonsOfReviewer().then(function (data) {
            myPersons = data;
            peeps = [];
            $scope.persons = filterPersons(persons, myPersons);
          });
        })
      });
    };

    $scope.toggleSearch = function (element) {
      $scope.showSearch = !$scope.showSearch;
    };
  }
})();
