(function () {

  'use strict';


  angular.module('oraj360')
    .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$scope', '$log', 'PersonFactory', 'SkillFactory', 'SkillCompetenceFactory', '$routeParams'];

  function SearchCtrl($scope, $log, PersonFactory, SkillFactory, SkillCompetenceFactory, $routeParams) {
    $log.info('SearchCtrl loaded');


    var id = $routeParams.otherId;

    $scope.users = [
      {firstName: 'Maarten Jacobs'}, {firstName: 'Wonne Keysers'}
    ];


    PersonFactory.getPersonById(id).then(function (data) {
      $scope.person = data;
      PersonFactory.getMyCoaches(data).then(function (data) {
        $scope.coaches = data;
        PersonFactory.getMyBusinessUnitManagers($scope.person)

      })
    })

  }
})();
