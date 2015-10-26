(function () {
  'use strict';

  angular.module('oraj360')
    .factory('PersonFactory', PersonFactory);

  PersonFactory.$inject = ['dataservice', 'PersonRestangular', '$location', '$timeout'];

  function PersonFactory(dataservice, PersonRestangular, $location, $timeout) {

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
        if (window.sessionStorage.getItem('logged')) {
        RestangularConfigurer.setBaseUrl(window.sessionStorage.getItem('url'));
        }
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

        connection: function () {
          var reader;

          function checkFileAPI() {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
              reader = new FileReader();
              return true;
            } else {
              alert('The File APIs are not fully supported by your browser. Fallback required.');
              return false;
            }
          }

          /**
           * read text input
           */
          function readText(filePath) {
            console.log(filePath);
            var output = "";
            if (filePath.files && filePath.files[0]) {
              reader.onload = function (e) {
                output = e.target.result;
                console.log(output);
              };//end onload()
              reader.readAsText(filePath.files[0]);
            }//end if html5 filelist su

          }

          checkFileAPI();
          console.log(readText('connection.properties'));


        },

        /* var handleSuccess = function (data) {
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
              window.sessionStorage.setItem('url', data.local);
            } else {
              window.sessionStorage.setItem('url', data.cloud);
            }
          };
         $http.get('connection.properties').success(handleSuccess);*/

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
