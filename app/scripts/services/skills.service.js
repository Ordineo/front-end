'use strict';

angular.module('empApp')
  .factory('SkillFactory', function (DataService, $resource) {
    var skills = [];

    function getSkillsWithCategory() {
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
          console.log(skills);
        }
      });
    }


    function getWithoutCategories(success) {
      DataService.getItem('http://localhost:8081/api/skills', success);
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
        getSkillsWithCategory();
        return skills;
      },
      getSkills: getWithoutCategories,
      update: getSkillsWithCategory,
      remove: remove,
      add: add,
      edit: edit,
      getSkillCategories: function () {
        getSkillCategories();
        return skillCategories;
      }

    };
  }
).
  factory('SkillCompetenceFactory', function (DataService, $resource) {

    function remove(href, success) {
      DataService.postItem('DELETE', href, null, null, success);
    }

    function add(skillCompetence, success) {
      DataService.postItem('POST', 'http://localhost:8081/api/skillCompetences/', skillCompetence, 'application/json', success, function () {
        var level = skillCompetence.competenceLevel;
        var skillId = skillCompetence.skill.split("/").pop();
        DataService.getItem('http://localhost:8081/api/skillCompetences/search/findSkillCompetenceBySkillId?skillId=' + skillId, function (data) {
          var sc = data.data._embedded.skillCompetences.pop();
          sc.competenceLevel = level;

          DataService.postItem('PUT', sc._links.self.href, sc, 'application/json', success);
        });
      });
    }

    var skillCompetences = [];

    function getSkillCompetencesWithSkill() {
      skillCompetences = [];
      var personId = window.sessionStorage.getItem("id");
      DataService.getItem('http://localhost:8081/api/skillCompetences/search/findSkillCompetenceByPerson?personId=' + personId, function (response) {
        var _skillCompetences = response.data._embedded.skillCompetences;
        if (_skillCompetences !== undefined) {
          _skillCompetences.forEach(function (skillCompetence) {
            var t = DataService.getItem(skillCompetence._links.skill.href, function (data) {
              skillCompetence.skill = data.data;
            });
            skillCompetences.push(skillCompetence);
          });
        }
      });
    }


    return {
      all: function () {
        getSkillCompetencesWithSkill();

        return skillCompetences;
      },
      remove: remove,
      add: add
    };


  }
)
  .factory('DataService', function ($http) {
    return {
      getItem: function (url, success) {
        return $http.get(url).then(success);
      },

      postItem: function (method, url, postdata, contentType, success, error) {

        return $http({
          method: method,
          url: url,
          data: postdata,
          headers: {'Content-Type': contentType}
        }).then(success, error);

      }
    };

  });
