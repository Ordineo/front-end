import IComponentOptions = angular.IComponentOptions;
import {StringUtil} from "./util/StringUtil";

require('./app-component.scss');

export const APP_COMPONENT = "app";

export class AppComponent implements IComponentOptions {
  controller:Function = AppComponentController;
  controllerAs:string = 'vm';
  bindings:any = {
    title: '@'
  };
  template:string = require('./app-component.html');
}

export class AppComponentController {
  public title:string;

  constructor() {
    this.title = "Jworks 360 Tool";
    var s = StringUtil.createShortVersion("How to build, design and test the security of web applications and web services.");
  }
}
