/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

module oraj360{

    "use strict";

    export function asHtml($sce :ng.ISCEService){
        return (text:string)=>{
            return $sce.trustAsHtml(text);
        }
    }

    angular
    .module("oraj360")
    .filter("asHtml",asHtml);

    asHtml.$inject = ["$sce"];


}