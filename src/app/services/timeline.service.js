'use strict';

angular.module('oraj360')
  .factory('Timeline', ['dataservice', function (dataservice) {

    var id = window.sessionStorage.getItem("id");
    var myTimeline = [];

    dataservice.getItem('http://localhost:9900/api/timelines/person/' + id).success(function (data) {
      if (data._embedded.objectiveResources != null) {
        data._embedded.objectiveResources.forEach(function (event) {
          myTimeline.push(event);
        })
      }
    });

    return {
      myTimeline: myTimeline
    };

  }]);
