import IComponentOptions = angular.IComponentOptions;
import {ToolbarController} from "./ToolbarController";

require('./toolbar.scss');

/**
 * @ngdoc component
 * @name mainToolbarV2
 * @module ordineo.layout.components.header
 *
 * @description
 * The main toolbar for the ordineo home page
 *
 * @usage
 * <toolbar></toolbar>
 */
export class ToolbarComponent implements IComponentOptions{
  static NAME:string = "toolbar";

  binding:any = {
    newMessagesCount: '<'
  };
  controller:any = ToolbarController;
  controllerAs:string = '$ctrl';
  template:string = require('./toolbar.html');

}
