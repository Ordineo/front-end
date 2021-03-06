import {LinkedInController} from "./LinkedInController";
import "./linkedin.scss";
import IDirective = angular.IDirective;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;

var $ = require("jquery");

export class LinkedInDirective implements IDirective {

  static NAME: string = "linkedin";

  scope: {};
  bindToController: any = {
    username: "@"
  };
  template: string = require("./linkedin.html");
  controller: Function = LinkedInController;
  controllerAs: string = "$ctrl";
  link: angular.IDirectiveLinkFn = (scope: IScope, el: IAugmentedJQuery) => {
    // todo use profileservice
    // scope.$on(HeaderController.EVENT_USER_SELECTED, (evt,data)=> {
    //   scope["$ctrl"].username = data.username;
    // });
    scope.$on(LinkedInController.EVENT_AUTH, () => {
      var find = $(el).find(".btn-linkedin");
      find.click();
    });
  };

  static instance(): IDirective {
    return new LinkedInDirective();
  }
}


