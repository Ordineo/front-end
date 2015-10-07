'use strict';


angular.module('empApp')
  .factory('AuthenticateFactory', AuthenticateFactory);

AuthenticateFactory.$inject = ['dataservice', 'PersonFactory', 'RoleFactory'];


function AuthenticateFactory(dataservice, PersonFactory, RoleFactory) {

  var logged;
  var role;
  var roles = [];
  return {
    getLogin: getLogin,
    setAuthorized: setAuthorized,
    isAuthorized: isAuthorized,
    initialise: initialise
  };

  function initialise(id) {
    if (id != null) {
      setAuthorized(true);
      PersonFactory.initialise(id);
      RoleFactory.initialise(id);

    }


  }

  function setAuthorized(logging) {
    logged = logging;
  }

  function isAuthorized() {
    return logged;
  }

  function getRole() {

    var handleIt = function (data, status) {
      data._embedded.roles.forEach(function (role) {
        roles.push(role);
      });

      role = roles[0].name;

    };
    dataservice.getItem('http://localhost:9900/api/roles/search/findByIdAndIsFunctional?id=' + PersonFactory.getId() + '&functional=false').success(handleIt);
    return role;

  }


  function getLogin(secret) {

    return dataservice.postItem('POST', 'http://localhost:9900/api/persons/login', secret, 'application/json');


  }


}
