(function () {
  'use strict';

  angular.module('oraj360')
    .factory('PersonFactory', PersonFactory);

  PersonFactory.$inject = ['dataservice', 'PersonRestangular', '$location'];

  function PersonFactory(dataservice, PersonRestangular, $location) {
    var persons = PersonRestangular.all('persons');
    var myId = window.sessionStorage.getItem("id");
    return {
      getMyDetails: getMyDetails,
      getAll: getAll,
      remove: remove,
      updatePerson: updatePerson,
      addPersonToReviewer: addPersonToReviewer,
      addCustomerToPerson: addCustomerToPerson,
      deleteCustomerFromPerson: deleteCustomerFromPerson
    };

    function getMyDetails(personId) {
      return persons.one(personId).get();
    }

    function remove(href) {
      persons.one(href).remove();
    }

    function addPersonToReviewer(personId, reviewer) {
      switch (reviewer) {
        case 'Bum':
        case 'Resource Manager':
          persons.one(personId).one('businessUnitManager', myId).post();
          break;
        case 'Competence Leader':
          persons.one(personId).one('competenceLeader', myId).post();
          break;
        case 'Practice Manager':
          persons.one(personId).one('practiceManager', myId).post();
          break;
        case 'Coach':
          persons.one(personId).one('coach', myId).post();
          break;
        default:
          $location.path('/profile')
      }
    }

    function getAll() {
      return persons.getList();
    }

    function updatePerson(person) {
      persons.put(person);
    }

    function addCustomerToPerson(selectedPerson, selectedCustomer) {
      persons.one(selectedPerson.username).one('customers', selectedCustomer.name).post();
    }

    function deleteCustomerFromPerson(selectedPerson, selectedPersonsCustomer) {
      persons.one(selectedPerson.username).one('customers', selectedPersonsCustomer.name).remove();
    }
  }

  angular.module('oraj360')
    .factory('PersonRestangular', function (Restangular) {
      return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');
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
              extractedData = data._embedded.roleResources;
              if (extractedData == null) {
                extractedData = data._embedded.persons;
                if (extractedData == null) {
                  extractedData = data._embedded.customers;
                }
              }
            }
          } else {
            extractedData = data;
          }
          return extractedData;
        })
      })
    });
  angular.module('oraj360')
    .factory('dataservice', ['$http', function ($http) {
      return {
        getItem: function (url) {
          return $http.get(url);
        },

        postItem: function (method, url, postdata, headers) {

          return $http({
            method: method,
            url: url,
            data: postdata,
            headers: {'Content-Type': headers}
          })
        }
      }

    }])

})();
