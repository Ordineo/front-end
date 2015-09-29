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

  var handlesucces = function(data,status){
      $scope.customers = data._embedded.customers;
  };

  CustomerFactory.getCustomers().success(handlesucces);

  $scope.createCustomer = function() {
    CustomerFactory.createCustomer();
  };
}
