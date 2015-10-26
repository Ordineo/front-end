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

    $scope.activities = [
      {
        "date":"2015-10-22",
        "tags": [
          {
            "tag": "SEO"
          },
          {
            "tag": "Soft skills"
          },
          {
            "tag": "Learn"
          }
        ],
        "action": "course",
        "subject": "Google analytics"
      },
      {
        "date":"2015-10-21",
        "tags": [
          {
            "tag": "Certificates"
          },
          {
            "tag": "Web apps"
          },
          {
            "tag": ".NET"
          }
        ],
        "action": "certificate",
        "subject": "Developing ASP.net MVC Web Applications"
      },
      {
        "date":"2015-10-20",
        "tags": [
          {
            "tag": "Win store apps"
          },
          {
            "tag": "Design"
          },
          {
            "tag": "Photoshop"
          }
        ],
        "action": "tutorial",
        "subject": "Windows store app design"
      },
      {
        "date":"2015-10-12",
        "tags": [
          {
            "tag": "Front-end"
          }
        ],
        "action": "chat",
        "subject": "Smashing Book #5: Real Life Responsive Web Design"
      },
      {
        "date":"2015-10-01",
        "tags": [
          {
            "tag": "Certificate"
          },
          {
            "tag": "Java"
          }
        ],
        "action": "certificate",
        "subject": "Java SE 8 Programmer I"
      }
    ]

    $scope.calculateDaysBetween = function(date) {
      var year = parseInt(date.substring(0,4));
      var month = parseInt(date.substring(5,7));
      var day = parseInt(date.substring(8,10));
      var date = new Date(year, month-1, day);
      var today = new Date();

      var timeDiff = Math.abs(today.getTime() - date.getTime());
      var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

      return diffDays > 0 ? (diffDays > 1 ? diffDays + ' days ago' : diffDays + ' day ago') : "Today";
    }
  });
