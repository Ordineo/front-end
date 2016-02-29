var template = require('./app-component.html');
import IComponentOptions = angular.IComponentOptions;

export const APP_COMPONENT = "app";

export class AppComponent implements IComponentOptions {
  controller:Function = AppComponentController;
  controllerAs:string = 'vm';
  bindings:any = {
    title: '@'
  };
  template:string = template;
}

function AppComponentController() {
  this.title = 'JWORKS 360';
}
