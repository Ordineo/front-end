'use strict';

angular.module('oraj360')
  .factory('RoleService', RoleService);

RoleService.$inject = ['RoleRestangular', 'PersonRestangular'];

function RoleService(RoleRestangular, PersonRestangular) {

  var id = window.sessionStorage.getItem("id");
  var persons = PersonRestangular.all('persons');
  var roles = RoleRestangular.all('roles');

  return {
    getFunctionalRoles: getFunctionalRoles,
    getApplicationRoleOfPerson: getApplicationRoleOfPerson,
    getFunctionalRolesOfPerson: getFunctionalRolesOfPerson,
    deleteRole: deleteRole,
    findRolesForOther: findRolesForOther,
    addRoleToPerson: addRoleToPerson
  };

  function addRoleToPerson(personId, role) {
    return persons.one(personId).all('roles').one(role).post();
  }

  function findRolesForOther(personId) {
    return persons.one(personId).one('roles', true).getList();
  }

  function getApplicationRoleOfPerson(personId) {
    return persons.one(personId).one('roles', false).getList();
  }

  function getFunctionalRolesOfPerson() {
    return persons.one(id).one('roles', true).getList();
  }

  function deleteRole(personId, roleId) {
    return persons.one(personId).one('roles', roleId).remove();
  }

  function getFunctionalRoles() {
    return roles.one('search').getList('isFunctional', {'functional': true});
  }

}
angular.module('oraj360')
  .factory('RoleRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(window.sessionStorage.getItem('url'));
      RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});

      RestangularConfigurer.setRestangularFields({
        selfLink: 'self.link'
      });

      RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        if (operation === "getList") {
          extractedData = data._embedded.roles;
          if (extractedData == null) {
            return true;
          }
        } else {
          extractedData = data._embedded.roles;
        }
        return extractedData;
      });

    });
  });
