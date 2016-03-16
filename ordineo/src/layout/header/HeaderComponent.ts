import IComponentOptions = angular.IComponentOptions;
import {HeaderController} from "./HeaderController";


require('./header.scss');

/**
 * @ngdoc Component
 */
export class HeaderComponent implements IComponentOptions{

  static NAME:string = "header";

  controller:Function = HeaderController;
  controllerAs:string = '$ctrl';
  template:string = require('./header.html');
}
