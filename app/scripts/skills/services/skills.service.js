'use strict';

angular.module('oraj360')
  .factory('SkillFactory', SkillFactory);

SkillFactory.$inject = ['SkillRestangular'];

function SkillFactory(SkillRestangular) {

  var skills = SkillRestangular.all('skills');

  return {
    getSkillsWithCategory: getSkillsWithCategory,
    getSkills: getSkills,
    getSkillCategories: getSkillCategories,
    update: getSkillsWithCategory,
    getSkill: getSkill,
    all: all,
    remove: remove,
    add: add,
    edit: edit

  };

  function all() {
    var skillData = {skills: 'This is some dummy content'};
    return skillData;
  }
  function getSkillsWithCategory() {
    return skills.one('search').getList('findBySkillCategoryNotNull');
  }

  function getSkill(href) {
    return SkillRestangular.one(href).get();
  }

  function getSkills() {
    return skills.getList();
  }

  function getSkillCategories() {
    return SkillRestangular.all('skillCategories').getList();
  }

  function remove(href) {
    return skills.one(href).remove();
  }

  function save(skill) {
    if (skill.category) {
      if (skill.category._links) {
        skill.skillCategory = skill.category._links.self.href;
        skills.post(skill);

      } else {
        SkillRestangular.one('skillCategories').post({name: skill.category}).then(function (data) {
          skill.skillCategory = data.headers('location');
          skills.post(skill);
        });
      }
    }
    else {
      skill.skillCategory = null;
      skills.post(skill);
    }
  }

  function edit(skill) {
    save(skill);
  }

  function add(skill) {
    save(skill);
  }

}


angular.module('oraj360')
  .factory('SkillCompetenceFactory', SkillCompetenceFactory);

SkillCompetenceFactory.$inject = ['SkillCompetenceRestangular'];

function SkillCompetenceFactory(SkillCompetenceRestangular) {

  var skillCompetences = SkillCompetenceRestangular.all('skillCompetences');

  return {
    getSkillCompetenceForPerson: getSkillCompetenceForPerson,
    remove: remove,
    add: add
  };


  function remove(href) {
    return skillCompetences.one(href).remove();
  }

  function add(skillCompetence) {
    return skillCompetences.post(skillCompetence);
  }

  function getSkillCompetenceForPerson(personId) {
    return skillCompetences.one('search').getList('findSkillCompetenceByPerson', {'username': personId});
  }


}
angular.module('oraj360')
  .factory('SkillRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      if (window.sessionStorage.getItem('url') === undefined || window.sessionStorage.getItem('url') === null) {

      }
      RestangularConfigurer.setBaseUrl(window.sessionStorage.getItem('url'));
      RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
      RestangularConfigurer.setRestangularFields({
        selfLink: 'self.link'
      });
      RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedDataList = [];
        var extractedData;
        if (operation === "getList") {
          if (Object.keys(data._embedded).length === 0) {
            return extractedDataList;
          } else {
            extractedData = data._embedded.skills;
          }
        } else {
          extractedData = data;
        }
        return extractedData;
      })
    })
  });
angular.module('oraj360')
  .factory('SkillCompetenceRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(window.sessionStorage.getItem('url'));
        RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
        RestangularConfigurer.setRestangularFields({
          selfLink: 'self.link'
        });
        RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var extractedDataList = [];
            var extractedData;
            if (operation === "getList") {
              if (data._embedded === undefined || data._embedded === null) {
                return extractedDataList;
              } else {
                if (Object.keys(data._embedded).length === 0) {
                  return extractedDataList;
                } else {
                  extractedData = data._embedded.skillCompetences;
                }
              }
            }
            else {
              extractedData = data;
            }
            return extractedData;
          }
        )
      }
    )
  })
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
