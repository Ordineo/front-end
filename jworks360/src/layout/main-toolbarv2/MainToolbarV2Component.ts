import IComponentOptions = angular.IComponentOptions;
import {MainToolbarV2Controller} from "./MainToolbarV2Controller";

require('./main-toolbar-v2-styles.scss');

/**
 * @ngdoc component
 * @name mainToolbarV2
 * @module jworks360.layout.components.header
 *
 * @description
 * The main toolbar for the jworks360 home page
 *
 * @usage
 * <main-toolbar-v2></main-toolbar-v2>
 */
export class MainToolbarV2Component implements IComponentOptions{
  static NAME:string = "mainToolbarV2";

  binding:any = {
    newMessagesCount: '<'
  };
  controller:any = MainToolbarV2Controller;
  controllerAs:string = '$ctrl';
  template:string = require('./main-toolbar-v2-template.html');

}

