import IComponentOptions = angular.IComponentOptions;
import {LinkedInController} from "./LinkedInController";

require('./linkedin.scss');

/**
 * @ngdoc Component
 */
export class LinkedInComponent implements IComponentOptions{

  static NAME:string = "linkedin";

  controller:Function = LinkedInController;
  controllerAs:string = '$ctrl';
  template:string = require('./linkedin.html');
}
