'use strict';

angular.module('empApp')
    .controller('PanelCtrl',PanelCtrl);
PanelCtrl.$inject = ['$scope', 'PersonFactory', 'persons', '$filter', 'person'];

function PanelCtrl($scope, PersonFactory, persons, $filter, person) {

  var peeps = [];
  var persona = person;

  console.log(persona);

  console.log($scope.person);

  persons.forEach(function (person) {
    if (person.unit == persona.unit && person.firstName != persona.firstName && person.lastName != persona.lastName) {
      peeps.push(person);
    }
  });


  $scope.persons = peeps;


  $scope.joinUnit = function (selected) {



        // dataservice.postItem('POST','http://localhost:9900/api/persons/2/bums/1',null,'application/json');

    }

  $scope.toggleSearch = function (element) {
    $scope.showSearch = !$scope.showSearch;
  };


}
