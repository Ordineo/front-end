'use strict';

angular.module('empApp')
  .factory('PersonFactory', PersonFactory);

PersonFactory.$inject = ['dataservice', 'PersonRestangular'];


function PersonFactory(dataservice, PersonRestangular) {

  var persons = [];

  var id = window.sessionStorage.getItem("id");
  return {
    remove: remove,
    getAll: getAll,
    updatePerson: updatePerson,
    initialise: initialise,
    getId: getId,
    getPerson: getPerson,
    getSelectedPerson: getSelectedPerson,
    getPersonById: getPersonById,
    addFunctionalRoleToPerson: addFunctionalRoleToPerson,
    deleteFunctionalRoleFromPerson: deleteFunctionalRoleFromPerson,
    getApplicationRolesFromPerson: getApplicationRolesFromPerson,
    getFunctionalRolesFromPerson: getFunctionalRolesFromPerson,
    addCustomerToPerson: addCustomerToPerson,
    getCustomersFromPerson: getCustomersFromPerson,
    deleteCustomerFromPerson: deleteCustomerFromPerson,
    addBumToPerson: addBumToPerson,
    getUsersFromPerson: getUsersFromPerson,
    getBumsFromPerson: getBumsFromPerson,
    addCompetenceLeaderToPerson: addCompetenceLeaderToPerson,
    getUsersFromCompetenceLeader: getUsersFromCompetenceLeader,
    getCompetenceLeadersFromPerson: getCompetenceLeadersFromPerson,
    addPracticeManagerToPerson: addPracticeManagerToPerson,
    getUsersFromPracticeManager: getUsersFromPracticeManager,
    getPracticeManagersFromPerson: getPracticeManagersFromPerson,
    addCoachToPerson: addCoachToPerson,
    getUsersFromCoach: getUsersFromCoach,
    getCoachesFromPerson: getCoachesFromPerson,
    getPersonsOfReviewer: getPersonsOfReviewer
  };

  function remove(href) {
    dataservice.postItem('DELETE', href);
  }

  function getPersonsOfReviewer() {
    var reviewer = window.sessionStorage.getItem('reviewer');

    switch (reviewer) {
      case 'Bum':

        return PersonRestangular.one('persons', 'search').getList('findByBusinessUnitManagersId', {'id': id});

    }

  }

  function getAll() {
    dataservice.getItem('http://localhost:8080/api/persons').success(function(data) {
      persons = data;
    });
    return persons;
  }

  function getId(){
    return id;
  }

  function getSelectedPerson(selected){
    return dataservice.getItem('http://localhost:8080/api/persons/search/findByFirstName?name='+selected);
  }

  function initialise() {


    dataservice.getItem('http://localhost:8080/api/persons').success(function (data) {
      data._embedded.persons.forEach(function (person) {
        persons.push(person);
      });
    });
  }
  function getPerson(){
    return getPersonById(id);
  }

  function getPersonById(id){
    return dataservice.getItem('http://localhost:8080/api/persons/'+id);
  }

  function updatePerson(person) {
    dataservice.postItem('PUT', person._links.self.href, {
      firstName: person.firstName,
      lastName: person.lastName,
      gender: person.gender
    }, 'application/json').success(function() {
      console.log('PERSON UPDATED');
    });
  }

  function addFunctionalRoleToPerson(href, selectedRole) {
    dataservice.postItem('POST', href, {
      name: selectedRole,
      isFunctional: true
    }, 'application/json').success(function() {
      console.log('ROLE ASSIGNED TO PERSON');
    });
  }

  function deleteFunctionalRoleFromPerson(selectedPerson, selectedPersonsFunctionalRole) {
    var hrefSelectedPerson = selectedPerson._links.self.href;
    var hrefSelectedPersonsFunctionalRole = selectedPersonsFunctionalRole._links.self.href;
    var index = hrefSelectedPersonsFunctionalRole.indexOf('/roles');
    var substring = hrefSelectedPersonsFunctionalRole.substring(index);
    var href = hrefSelectedPerson.concat(substring);
    dataservice.postItem('DELETE', href, null, 'application/json').success(function() {
      console.log('FUNCTIONAL ROLE DELETED FROM PERSON');
    });
  }

  function getApplicationRolesFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/roles/false');
  }

  function getFunctionalRolesFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/roles/true');
  }

  //Person's Customers
  function addCustomerToPerson(selectedPerson, selectedCustomer) {
    var href = '';
    var hrefSelectedPerson = selectedPerson._links.self.href;
    var hrefSelectedCustomer = selectedCustomer._links.self.href;
    var index = hrefSelectedCustomer.indexOf('/customers');
    var substring = hrefSelectedCustomer.substring(index);
    href = hrefSelectedPerson.concat(substring);

    dataservice.postItem('POST', href, {
      name: selectedCustomer.name,
      description: selectedCustomer.description
    }, 'application/json').success(function() {
      console.log('CUSTOMER ASSIGNED TO PERSON');
    });
  }

  function getCustomersFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/customers');
  }

  function deleteCustomerFromPerson(selectedPerson, selectedPersonsCustomer) {
    var hrefSelectedPerson = selectedPerson._links.self.href;
    var hrefSelectedPersonsCustomer = selectedPersonsCustomer._links.self.href;
    var index = hrefSelectedPersonsCustomer.indexOf('/customers');
    var substring = hrefSelectedPersonsCustomer.substring(index);
    var href = hrefSelectedPerson.concat(substring);
    dataservice.postItem('DELETE', href, null, 'application/json').success(function() {
      console.log('CUSTOMER DELETED FROM PERSON');
    });
  }

  //BUMs
  function addBumToPerson(person) {
    dataservice.postItem('POST', person._links.self.href.concat('/businessUnitManagers/' + id), null, 'application/json').success(function() {
      console.log('PERSON ASSIGNED TO ME (BUM)');
    });
  }

  function getUsersFromPerson() {
    return dataservice.getItem('http://localhost:8080/api/persons/search/findByBusinessUnitManagersId?id=' + id);
  }

  function getBumsFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/businessUnitManagers');
  }

  //Competence Leaders
  function addCompetenceLeaderToPerson(person) {
    dataservice.postItem('POST', person._links.self.href.concat('/competenceLeaders/' + id), null, 'application/json').success(function() {
      console.log('PERSON ASSIGNED TO ME (CL)')
    });
  }

  function getUsersFromCompetenceLeader() {
    return dataservice.getItem('http://localhost:8080/api/persons/search/findByCompetenceLeadersId?id=' + id);
  }

  function getCompetenceLeadersFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/competenceLeaders');
  }

  //Practice Managers
  function addPracticeManagerToPerson(person) {
    dataservice.postItem('POST', person._links.self.href.concat('/practiceManagers/' + id), null, 'application/json').success(function() {
      console.log('PERSON ASSIGNED TO ME (PM)')
    });
  }

  function getUsersFromPracticeManager() {
    return dataservice.getItem('http://localhost:8080/api/persons/search/findByPracticeManagersId?id=' + id);
  }

  function getPracticeManagersFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/practiceManagers');
  }

  //Coaches
  function addCoachToPerson(person) {
    dataservice.postItem('POST', person._links.self.href.concat('/coaches/' + id), null, 'application/json').success(function() {
      console.log('PERSON ASSIGNED TO ME (COACH)')
    });
  }

  function getUsersFromCoach() {
    return dataservice.getItem('http://localhost:8080/api/persons/search/findByCoachesId?id=' + id);
  }

  function getCoachesFromPerson(person) {
    return dataservice.getItem(person._links.self.href + '/coaches');
  }
}


angular.module('empApp')
.factory('RoleFactory',RoleFactory);

RoleFactory.$inject =['dataservice','PersonFactory'];

function RoleFactory(dataservice,PersonFactory) {
  var applicationRoles = [];
  var functionalRoles =[];
  var allFunctionalRoles =[];
  var allApplicationRoles = [];
  var applicationRolesPerson = [];
  var id = window.sessionStorage.getItem("id");
  var applicationrole;

  return{
    initialise : initialise,
    getAllFunctionalRoles : getAllFunctionalRoles,
    updateFunctionalRoles :updateFunctionalRoles,
    getApplicationRolesPerson : getApplicationRolesPerson,
    getFunctionalRoles : getFunctionalRoles,
    getAllApplicationRoles : getAllApplicationRoles



  };

function initialise() {


  dataservice.getItem('http://localhost:8080/api/persons/'+id+'/roles/false').success(function (data) {
    if(data._embedded.roleResources !== undefined) {
      data._embedded.roleResources.forEach(function (role) {
        applicationRolesPerson.push(role);
      })}
   // applicationrole = applicationRolesPerson[0].name;
    //window.sessionStorage.setItem('role',applicationrole);
  });
  dataservice.getItem('http://localhost:8080/api/persons/' + id + '/roles/true').success(function (data) {
    if(data._embedded.roleResources !== undefined) {
      data._embedded.roleResources.forEach(function (role) {
        functionalRoles.push(role);
      })}
  });
  dataservice.getItem('http://localhost:8080/api/roles/search/isFunctional?functional=true').success(function (data) {
    if(data._embedded.roles !== undefined) {
      data._embedded.roles.forEach(function (role) {
        allFunctionalRoles.push(role);

      })}
  });
  dataservice.getItem('http://localhost:8080/api/roles/search/isFunctional?functional=false').success(function (data) {
    if(data._embedded.roles !== undefined) {
      data._embedded.roles.forEach(function (role) {
        allApplicationRoles.push(role);

      })}
  });
}

  function getAllApplicationRoles(){
    return allApplicationRoles;
  }
  function getAllFunctionalRoles(){
          return allFunctionalRoles;
        }
  function getApplicationRolesPerson() {
          return applicationRolesPerson;
        }
  function getFunctionalRoles(){
          return functionalRoles;
        }
  function updateFunctionalRoles () {
          functionalRoles = [];
          dataservice.getItem('http://localhost:8080/api/roles/search/findByIdAndIsFunctional?id='+id+'&functional=true').success(function (data) {
            data._embedded.roles.forEach(function (role) {
              if(data._embedded.roles !== undefined) {
              functionalRoles.push(role);
            }});
          });
          return functionalRoles;
        }
      }


angular.module('empApp')
.factory('dataservice',['$http',function($http){



  return{
    getItem:function(url){
      return $http.get(url);
    },

    postItem:function(method,url,postdata,headers){

      return $http({
        method:method,
        url:url,
        data:postdata,
        headers:{'Content-Type':headers}
      })
    }
  }

}])
.directive('username', function($q, $timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        $timeout(function() {
          // Mock a delayed response
          if (usernames.indexOf(modelValue) === -1) {
            // The username is available
            def.resolve();
          } else {
            def.reject();
          }

        }, 2000);

        return def.promise;
      };
    }
  };
})
  .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }]);
