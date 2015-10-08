angular.module('empApp')
  .factory('RoleService', RoleService);

RoleService.$inject = ['RoleRestangular', 'PersonRestangular'];

function RoleService(RoleRestangular, PersonRestangular) {
  var id = window.sessionStorage.getItem("id");

  return {
    getFunctionalRoles: getFunctionalRoles,
    getAll: getAll,
    deleteRole: deleteRole,
    findRolesForOther: findRolesForOther,
    addRoleToPerson: addRoleToPerson
  };

  function addRoleToPerson(personId, role) {

    return PersonRestangular.one('persons', personId).all('roles').one(role).post();
  }

  function findRolesForOther(personId) {

    return PersonRestangular.one('persons', personId).one('roles', true).getList();
  }

  function getAll() {

    return PersonRestangular.one('persons', id).one('roles', true).getList();
  }

  function deleteRole(personId, roleId) {

    return PersonRestangular.one('persons', personId).one('roles', roleId).remove();
  }

  function getFunctionalRoles() {

    return RoleRestangular.one('roles', 'search').getList('isFunctional', {'functional': true});
  }

}
angular.module('empApp')
  .factory('RoleRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');

      RestangularConfigurer.setRestangularFields({
        selfLink: 'self.link'
      });

      RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
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
