angular.module('empApp')
  .factory('RoleService', RoleService);

RoleService.$inject = ['dataservice', 'RoleRestangular'];

function RoleService(dataservice, RoleRestangular) {
  var applicationRoles = [];
  var functionalRoles = [];
  var allFunctionalRoles = [];
  var allApplicationRoles = [];
  var applicationRolesPerson = [];
  var id = window.sessionStorage.getItem("id");
  var applicationrole;


  return {
    initialise: initialise,
    updateFunctionalRoles: updateFunctionalRoles,
    getFunctionalRoles: getFunctionalRoles,
    getAll: getAll,
    deleteRole: deleteRole


  };


  function initialise() {

    dataservice.getItem('http://localhost:8080/api/persons/' + id + '/roles/false').success(function (data) {
      if (data._embedded.roleResources !== undefined) {
        data._embedded.roleResources.forEach(function (role) {
          applicationRolesPerson.push(role);
        })
      }
      // applicationrole = applicationRolesPerson[0].name;
      //window.sessionStorage.setItem('role',applicationrole);
    });
    dataservice.getItem('http://localhost:8080/api/persons/' + id + '/roles/true').success(function (data) {
      if (data._embedded.roleResources !== undefined) {
        data._embedded.roleResources.forEach(function (role) {
          functionalRoles.push(role);
        })
      }
    });
    dataservice.getItem('http://localhost:8080/api/roles/search/isFunctional?functional=true').success(function (data) {
      if (data._embedded.roles !== undefined) {
        data._embedded.roles.forEach(function (role) {
          allFunctionalRoles.push(role);

        })
      }
    });
  }

  function findOne(id) {

  }

  function getAll() {


    return RoleRestangular.one('persons', id).getList('roles');


  }

  function deleteRole(roleId) {


    return RoleRestangular.one('persons', id).one('roles', roleId).remove();


  }

  function getFunctionalRoles() {
    return functionalRoles;
  }

  function updateFunctionalRoles() {
    functionalRoles = [];
    dataservice.getItem('http://localhost:8080/api/roles/search/findByIdAndIsFunctional?id=' + id + '&functional=true').success(function (data) {
      data._embedded.roles.forEach(function (role) {
        if (data._embedded.roles !== undefined) {
          functionalRoles.push(role);
        }
      });
    });
    return functionalRoles;
  }
}
angular.module('empApp')
  .factory('RoleRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:8080/api/');

      RestangularConfigurer.setRestangularFields({
        selfLink: 'self.link'
      });

      RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
          extractedData = data._embedded.roles;
        } else {
          extractedData = data._embedded.roles;
        }
        return extractedData;
      });

    });
  });
