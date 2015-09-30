'use strict';

angular.module('empApp')
  .factory('SkillFactory', function ($http, DataService, $resource) {
    var skills = [];

    function getSkills() {
      skills = [];

      DataService.getItem('http://localhost:8081/api/skills', function (data) {
        data = data.data._embedded.skills;
        if (data !== undefined) {
          data.forEach(function (skill) {
            console.log(skill);
            if (skill._links.skillCategory) {

              var SkillCategory = $resource(skill._links.skillCategory.href);
              var v = SkillCategory.get().$promise.then(function (data) {
                skill.category = data.name;
              });
            }

            skills.push(skill);
          });
        }
      });
    }

    function remove(href, success) {
      DataService.postItem('DELETE', href, null, null, success);
    }

    return {
      all: function () {
        getSkills();
        return skills;
      },
      update: getSkills,
      remove: remove

    };
  }
)
  .factory('DataService', function ($http) {
    return {
      getItem: function (url, success) {
        return $http.get(url).then(success);
      },

      postItem: function (method, url, postdata, contentType, success) {

        return $http({
          method: method,
          url: url,
          data: postdata,
          headers: {'Content-Type': contentType}
        }).success(success);

      }
    };

  });
