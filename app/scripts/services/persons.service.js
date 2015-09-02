'use strict';

angular.module('empApp')
  .factory('PersonFactory', function ($http) {

    var persons = [];

    $http.get('http://localhost:8080/api/persons').success(function (data) {
      data.forEach(function (person) {
        persons.push(person);
      });
    });

    return {
      all: function () {
        return persons;
      },
      update: function () {
        persons = [];
        $http.get('http://localhost:8080/api/persons').success(function (data) {
          data.forEach(function (person) {
            persons.push(person);
          });
        });
        return persons;
      }
    };
  });
