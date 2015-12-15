
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
///<reference path="searchService.ts"/>

module oraj360{

    export class SearchController{

        private breachedAccount: BreachedAccount[];



        static $inject = ["SearchService"];

        constructor(private searchService:ISearchService){


        }

        submit(address:string){
            this.searchService.check(address).then((result : ng.IHttpPromiseCallbackArg<{}>)=>{
                this.breachedAccount = result.data;
            })
            .catch((reason:any) =>{
                    alert(reason.message);
                });
        }


    }
    angular.module("oraj360")
    .controller("SearchController",SearchController);
}