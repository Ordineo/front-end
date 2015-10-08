'use strict';

angular.module('empApp')
    .controller('PanelCtrl',PanelCtrl);
PanelCtrl.$inject = ['$scope', 'PersonFactory', 'persons', '$filter', 'person'];

function PanelCtrl($scope, PersonFactory, persons, $filter, person) {

  var peeps = [];
  var persona = person;

  console.log(persona);

  console.log($scope.person);

  var filterPersons = function (list) {

    list.forEach(function (person) {
      if (person.unit != persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
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


    PersonFactory.addBumToPerson(personId).then(function (data) {
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
