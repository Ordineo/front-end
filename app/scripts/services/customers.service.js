'use strict';

angular.module('empApp').factory('CustomerFactory', CustomerFactory);

CustomerFactory.$inject = ['dataservice'];

function CustomerFactory(dataservice) {
  var customers = [];
  var customersURL = 'http://localhost:8080/api/customers';

  return {
    getCustomers: getCustomers,
    createCustomer: createCustomer
  };

  function getCustomers() {
    return dataservice.getItem(customersURL);
  }

  function createCustomer() {
    dataservice.postItem('POST', customersURL, JSON.stringify({
      "name": 'Test customer',
      "description": 'This is a testcustomer'
    }), 'application/json').success(function() {
      console.log('CUSTOMER CREATED');
    });
  }
}
