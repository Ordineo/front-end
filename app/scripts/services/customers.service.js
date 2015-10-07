'use strict';

angular.module('empApp').factory('CustomerFactory', CustomerFactory);

CustomerFactory.$inject = ['dataservice'];

function CustomerFactory(dataservice) {
  var customers = [];
  var customersURL = 'http://localhost:9900/api/customers';

  return {
    getCustomers: getCustomers,
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer
  };

  function getCustomers() {
    return dataservice.getItem(customersURL);
  }

  function createCustomer(name, description) {
    dataservice.postItem('POST', customersURL, JSON.stringify({
      name: name,
      description: description
    }), 'application/json').success(function() {
      console.log('CUSTOMER CREATED');
    });
  }

  function updateCustomer(href, name, description) {
    dataservice.postItem('PUT', href, {
      name: name,
      description: description
    }, 'application/json').success(function() {
      console.log('CUSTOMER UPDATED');
    });
  }

  function deleteCustomer(href) {
    dataservice.postItem('DELETE', href).success(function() {
      console.log('CUSTOMER DELETED');
    });
  }
}
