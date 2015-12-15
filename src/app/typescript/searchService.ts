/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

module oraj360 {


    export interface ISearchService {
        check(address:string) : ng.IPromise<{}>;
    }

    class SearchService implements ISearchService {

        static $inject = ["$http", "$q"];

        constructor(private $http:ng.IHttpService, private $q:ng.IQService) {


        }

        check(address:string):ng.IPromise<{}> {
            var defer = this.$q.defer();
            // return $http.get(url);
            return defer.promise;
        }
    }

    angular
        .module("oraj360")
        .service("SearchService", SearchService);

}