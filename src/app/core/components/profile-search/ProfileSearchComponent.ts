import IComponentOptions = angular.IComponentOptions;
import {ProfileSearchController} from "./ProfileSearchController";
/**
 * @ngdoc Component
 */
export class ProfileSearchComponent implements IComponentOptions{

  static NAME:string = "profileSearch";

  controller:Function = ProfileSearchController;
  template:string = require('./profile-search.html');
}
