/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var SearchService = (function () {
        function SearchService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        SearchService.prototype.check = function (address) {
            var defer = this.$q.defer();
            // return $http.get(url);
            return defer.promise;
        };
        SearchService.$inject = ["$http", "$q"];
        return SearchService;
    })();
    angular.module("oraj360").service("SearchService", SearchService);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=searchService.js.map