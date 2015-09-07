'use strict';

angular.module('empApp')
  .factory('SkillFactory', function ($http) {
    var skills = [];
    var getSkills = (function () {
      skills = [];
      $http.get('http://localhost:8081/api/skills').success(function (data) {
        if(typeof myVar != 'undefined') {
          data._embedded.skills.forEach(function (skill) {
            skills.push(skill);
          });
        }
      });
    })();

    return {
      all: function () {
        return skills;
      },
      update: getSkills
    };
  })
  .factory('DataService', ['$http', function ($http) {
    return {
      getItem: function (url) {
        return $http.get(url);
      },

      postItem: function (method, url, postdata, headers) {

        return $http({
          method: method,
          url: url,
          data: postdata,
          headers: {'Content-Type': headers}
        })
      }
    }

  }]);
