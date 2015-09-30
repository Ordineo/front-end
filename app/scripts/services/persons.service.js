'use strict';

angular.module('empApp')
  .factory('PersonFactory',PersonFactory);

PersonFactory.$inject = ['dataservice'];



function PersonFactory(dataservice) {

  var persons = [];

  var id = window.sessionStorage.getItem("id");
  return {
    remove: remove,
    getAll: getAll,
    updatePerson : updatePerson,
    initialise : initialise,
    getId : getId,
    getPerson: getPerson,
    getSelectedPerson : getSelectedPerson,
    addFunctionalRoleToPerson: addFunctionalRoleToPerson
  };

  function remove(href) {
    dataservice.postItem('DELETE', href);
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
      console.log('ROLES ASSIGNED');
    });
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
