'use strict';

angular.module('oraj360')
  .factory('PersonFactory', PersonFactory);

PersonFactory.$inject = ['dataservice', 'PersonRestangular', '$location'];


function PersonFactory(dataservice, PersonRestangular, $location) {

  var persons = [];
  var href = 'http://localhost:9900';
  var myId = window.sessionStorage.getItem("id");
  return {
    getMyDetails: getMyDetails,
    getMyFunctionalRoles: getMyFunctionalRoles,
    getMyCustomers: getMyCustomers,
    getMyBusinessUnitManagers: getMyBusinessUnitManagers,
    getMyCompetenceLeaders: getMyCompetenceLeaders,
    getMyPracticeManagers: getMyPracticeManagers,
    getMyCoaches: getMyCoaches,
    getAll: getAll,
    remove: remove,
    updatePerson: updatePerson,
    initialise: initialise,
    getId: getId,
    getPerson: getPerson,
    getSelectedPerson: getSelectedPerson,
    getPersonById: getPersonById,
    getPersonsOfReviewer: getPersonsOfReviewer,
    addPersonToReviewer: addPersonToReviewer,
    addFunctionalRoleToPerson: addFunctionalRoleToPerson,
    deleteFunctionalRoleFromPerson: deleteFunctionalRoleFromPerson,
    addCustomerToPerson: addCustomerToPerson,
    deleteCustomerFromPerson: deleteCustomerFromPerson
  };

  //----------
  //Profile
  //----------

  function searchForPersonId(person) {
    var value = '/persons/';
    var index = person._links.self.href.indexOf(value);
    return person._links.self.href.substring(index + value.length);
  }

  //Rename function names? (functions can now get data for every person)

  function getMyDetails(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).get();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).get();
    }
  }

  function getMyFunctionalRoles(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).one('roles', true).getList();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).one('roles', true).getList();
    }
  }

  function getMyCustomers(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).all('customers').getList();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).all('customers').getList();
    }
  }

  function getMyBusinessUnitManagers(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).all('businessUnitManagers').getList();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).all('businessUnitManagers').getList();
    }
  }

  function getMyCompetenceLeaders(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).all('competenceLeaders').getList();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).all('competenceLeaders').getList();
    }
  }

  function getMyPracticeManagers(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).all('practiceManagers').getList();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).all('practiceManagers').getList();
    }
  }

  function getMyCoaches(person) {
    if (person === null) {
      return PersonRestangular.one('persons', myId).all('coaches').getList();
    } else {
      return PersonRestangular.one('persons', searchForPersonId(person)).all('coaches').getList();
    }
  }

  //
  //
  //

  function remove(href) {
    dataservice.postItem('DELETE', href);
  }

  function addPersonToReviewer(personId) {
    var reviewer = window.sessionStorage.getItem('reviewer');

    switch (reviewer) {
      case 'Bum':
      case 'Resource Manager':
        return PersonRestangular.one('persons', personId).one('businessUnitManagers', myId).post();
      case 'Competence Leader':
        return PersonRestangular.one('persons', personId).one('competenceLeaders', myId).post();
      case 'Practice Manager':
        return PersonRestangular.one('persons', personId).one('practiceManagers', myId).post();
      case 'Coach':
        return PersonRestangular.one('persons', personId).one('coaches', myId).post();
      default:
        $location.path('/profile')
    }

  }

  function getPersonsOfReviewer() {
    var reviewer = window.sessionStorage.getItem('reviewer');

    switch (reviewer) {
      case 'Bum':
      case 'Resource Manager':
        return PersonRestangular.one('persons', 'search').getList('findByBusinessUnitManagersId', {'id': myId});
      case 'Competence Leader':
        return PersonRestangular.one('persons', 'search').getList('findByCompetenceLeadersId', {'id': myId});
      case 'Practice Manager':
        return PersonRestangular.one('persons', 'search').getList('findByPracticeManagersId', {'id': myId});
      case 'Coach':
        return PersonRestangular.one('persons', 'search').getList('findByCoachesId', {'id': myId});
      default:
        $location.path('/profile')
    }

  }

  function getAll() {
    return PersonRestangular.all('persons').getList();

  }

  function getId(){
    return id;
  }

  function getSelectedPerson(selected){
    return dataservice.getItem('http://localhost:9900/api/persons/search/findByFirstName?name='+selected);
  }

  function initialise() {


    dataservice.getItem('http://localhost:9900/api/persons').success(function (data) {
      data._embedded.persons.forEach(function (person) {
        persons.push(person);
      });
    });
  }

  function getPerson(href) {
    return PersonRestangular.one(href);
  }

  function getPersonById(personId) {
    return PersonRestangular.one('persons', personId).get();
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
}


angular.module('oraj360')
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
