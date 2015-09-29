'use strict';

angular.module('empApp')
    .controller('PanelCtrl',PanelCtrl);
PanelCtrl.$inject=['$scope', '$log','dataservice','RoleFactory','$location','PersonFactory'];

function PanelCtrl($scope,$log, dataservice,RoleFactory,$location,PersonFactory) {


    $scope.getPersons = function(){
        $scope.persons = PersonFactory.getAll();
        console.log($scope.persons[0]);
    };
$scope.getPersons();

    $scope.joinUnit = function(selected){


        PersonFactory.getPerson(selected)

        // dataservice.postItem('POST','http://localhost:8080/api/persons/2/bums/1',null,'application/json');

    }



}
