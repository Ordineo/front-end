'use strict';

angular.module('empApp')
  .factory('SkillFactory', function (DataService, $resource) {
    var skills = [];

    function getSkills() {
      skills = [];

      DataService.getItem('http://localhost:8081/api/skills', function (data) {
        data = data.data._embedded.skills;
        if (data !== undefined) {
          data.forEach(function (skill) {
            if (skill._links.skillCategory) {
              var t = DataService.getItem(skill._links.skillCategory.href, function (data) {
                skill.category = data.data.name;
              });
              skills.push(skill);
            }
          });
        }
      });
    }

    function remove(href, success) {
      DataService.postItem('DELETE', href, null, null, success);
    }

    function edit(skill, success) {
      DataService.postItem('POST', 'http://localhost:8081/api/skillCategories/', skill.skillCategory, 'application/json', function (data, config, headers) {
        skill.skillCategory = headers('location');
        DataService.postItem('PUT', skill._links.self.href, skill, 'application/json', function () {
        });

        success();

      });
    }

    function add(skill, success) {
      if (skill.skillCategory) {
        console.log(skill.skillCategory);
        DataService.postItem('POST', 'http://localhost:8081/api/skillCategories/', skill.skillCategory, 'application/json', function (data, config, headers) {
          skill.skillCategory = headers('location');
          DataService.postItem('POST', 'http://localhost:8081/api/skills/', skill, 'application/json', success);

        });
      } else {
        DataService.postItem('POST', 'http://localhost:8081/api/skills/', skill, 'application/json', success);
      }
    }

    return {
      all: function () {
        getSkills();
        return skills;
      },
      update: getSkills,
      remove: remove,
      add: add,
      edit: edit

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
