import IComponentOptions = angular.IComponentOptions;

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
  }
}
