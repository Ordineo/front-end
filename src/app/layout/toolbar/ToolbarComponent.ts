import IComponentOptions = angular.IComponentOptions;
import {ToolbarController} from "./ToolbarController";
import './images/jworks.png';
import './toolbar.scss';

/**
 * @ngdoc component
 * @name toolbar
 * @module ordineo.layout.components.header
 *
 * @description
 * The main toolbar for the ordineo home page
 *
 * @usage
 * <toolbar employee-name='$ctrl.name'></toolbar>
 */
export class ToolbarComponent implements IComponentOptions {
  static NAME:string = "toolbar";

  bindings:any = {
    employeeName: '<',
    newMessagesCount: '<'
  };
  controller:any = ToolbarController;
  template:string = require('./toolbar.html');
}
