'use strict';

/**
 * @ngdoc function
 * @name oraj360.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the oraj360
 */
angular.module('oraj360')
    .controller('DashboardCtrl', function ($scope, $log, Timeline) {

    $log.info('DashboardCtrl loaded');

    //$scope.timelineItems = Timeline.all();

    $scope.myTimelineItems = Timeline.myTimeline;
  });
