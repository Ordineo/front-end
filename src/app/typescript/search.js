/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
///<reference path="searchService.ts"/>
var oraj360;
(function (oraj360) {
    var SearchController = (function () {
        function SearchController(searchService) {
            this.searchService = searchService;
        }
        SearchController.prototype.submit = function (address) {
            var _this = this;
            this.searchService.check(address).then(function (result) {
                _this.breachedAccount = result.data;
            }).catch(function (reason) {
                alert(reason.message);
            });
        };
        SearchController.$inject = ["SearchService"];
        return SearchController;
    })();
    oraj360.SearchController = SearchController;
    angular.module("oraj360").controller("SearchController", SearchController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=search.js.map