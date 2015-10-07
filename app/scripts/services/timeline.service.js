'use strict';

angular.module('empApp')
.factory('Timeline', ['dataservice', function(dataservice) {

    var id = window.sessionStorage.getItem("id");
    var myTimeline = [];

    dataservice.getItem('http://localhost:8082/api/timelines/person/' + id).success(function(data) {
      data._embedded.objectiveResources.forEach(function(event) {
        myTimeline.push(event);
      })
    });

    return {
      myTimeline: myTimeline
    };

}]);
