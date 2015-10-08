'use strict';

angular.module('empApp')
    .controller('PanelCtrl',PanelCtrl);
PanelCtrl.$inject = ['$scope', 'PersonFactory', 'persons'];

function PanelCtrl($scope, PersonFactory, persons) {


  $scope.persons = persons;

    $scope.joinUnit = function(selected){



        // dataservice.postItem('POST','http://localhost:9900/api/persons/2/bums/1',null,'application/json');

    }



}
