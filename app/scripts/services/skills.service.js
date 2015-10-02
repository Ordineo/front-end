'use strict';

angular.module('empApp')
  .factory('SkillFactory', function (DataService, $resource) {
    var skills = [];

    function getSkills() {
      skills = [];

      DataService.getItem('http://localhost:8081/api/skills', function (response) {
        var _skills = response.data._embedded.skills;
        if (_skills !== undefined) {
          _skills.forEach(function (skill) {
            var t = DataService.getItem(skill._links.skillCategory.href, function (data) {
              skill.category = data.data;
            });
            skills.push(skill);
          });
        }
      });
    }


    var skillCategories = [];

    function getSkillCategories() {
      DataService.getItem('http://localhost:8081/api/skillCategories', function (response) {
        skillCategories = response.data._embedded.skillCategories;
      })
    }

    function remove(href, success) {
      DataService.postItem('DELETE', href, null, null, success);
    }

    function save(skill, success, method) {
      console.log(method);
      if (skill.category) {

        if (skill.category._links) {
          skill.skillCategory = skill.category._links.self.href;
          DataService.postItem(method.method, method.url, skill, 'application/json', success);

        } else {
          DataService.postItem('POST', 'http://localhost:8081/api/skillCategories/', {name: skill.category}, 'application/json', function (data, config, headers) {
            skill.skillCategory = headers('location');
            DataService.postItem(method.method, method.url, skill, 'application/json', success);
          });

        }
      }
      else {
        skill.skillCategory = null;
        DataService.postItem(method.method, method.url, skill, 'application/json', success);
      }

    }

    function edit(skill, success) {
      save(skill, success, {method: 'PUT', url: skill._links.self.href});

    }

    function add(skill, success) {
      save(skill, success, {method: 'POST', url: 'http://localhost:8081/api/skills/'});

    }

    return {
      all: function () {
        getSkills();
        return skills;
      },
      update: getSkills,
      remove: remove,
      add: add,
      edit: edit,
      getSkillCategories: function () {
        getSkillCategories();
        return skillCategories;
      }

    };
  }
).factory('SkillCompetenceFactory', function (DataService, $resource) {

    return {


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
