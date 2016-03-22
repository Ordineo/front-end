import IComponentOptions = angular.IComponentOptions;

require('./app-component.scss');

export const APP_COMPONENT = "app";

export class AppComponent implements IComponentOptions {
  template:string = require('./app-component.html');
}
