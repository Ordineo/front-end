/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    "use strict";
    function asHtml($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
    oraj360.asHtml = asHtml;
    angular.module("oraj360").filter("asHtml", asHtml);
    asHtml.$inject = ["$sce"];
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=asHtml.filter.js.map