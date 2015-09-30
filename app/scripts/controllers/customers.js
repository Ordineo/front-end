'use strict';

/**
 * @ngdoc function
 * @name empApp.controller:CustomersCtrl
 * @description
 * # CustomersCtrl
 * Controller of the frontendApp
 */

angular.module('empApp').controller('CustomersCtrl', CustomersCtrl);

CustomersCtrl.$inject =['$scope', '$log', '$http', 'CustomerFactory', 'dataservice'];

function CustomersCtrl($scope, $log, $http, CustomerFactory, dataservice) {
  $log.info('CustomersCtrl loaded');

  $scope.customer = {};

  var handlesucces = function(data,status){
      $scope.customers = data._embedded.customers;
  };

  CustomerFactory.getCustomers().success(handlesucces);

  $scope.createCustomer = function() {
    CustomerFactory.createCustomer($scope.customer.name, $scope.customer.description);
  };

  $scope.selectCustomer = function (customer) {
    $http.get(customer._links.self.href).success(function(data) {
      $scope.selectedCustomer = data;
    });
  };

  $scope.deleteCustomer = function(href, index) {
    CustomerFactory.deleteCustomer(href);
    $scope.customers.splice(index, 1);
  };

  $scope.updateCustomer = function(customer) {
    CustomerFactory.updateCustomer(customer._links.self.href, customer.name, customer.description);
  }
}
