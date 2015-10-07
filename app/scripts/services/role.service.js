angular.module('empApp')
  .factory('RoleService', RoleService);

RoleService.$inject = ['dataservice', 'RoleRestangular', 'PersonRestangular'];

function RoleService(dataservice, RoleRestangular, PersonRestangular) {
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


  }

  function findOne(id) {

  }

  function getAll() {


    return PersonRestangular.one('persons', id).one('roles', true).getList();


  }


  function deleteRole(roleId) {


    return PersonRestangular.one('persons', id).one('roles', roleId).remove();


  }


  function getFunctionalRoles() {
    return RoleRestangular.one('roles', 'search').getList('isFunctional', {'functional': true});
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
