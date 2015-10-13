'use strict';


angular.module('oraj360')
  .factory('AuthenticateFactory', AuthenticateFactory);

AuthenticateFactory.$inject = ['dataservice', 'PersonFactory'];


function AuthenticateFactory(dataservice, PersonFactory) {

  var logged;
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

    }

  }
  function setAuthorized(logging) {
    logged = logging;
  }
  function isAuthorized() {
    return logged;
  }
  function getLogin(secret) {
    return dataservice.postItem('POST', 'http://localhost:9900/api/persons/login', secret, 'application/json');
  }
}
