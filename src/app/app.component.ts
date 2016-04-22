import IComponentOptions = angular.IComponentOptions;
import {DashboardComponent} from "./layout/DashboardComponent";

require('./app-component.scss');

export class AppComponent implements IComponentOptions {
  static NAME:string = "app";

  template:string = require('./app-component.html');
  $routeConfig:any = [
    {path: '/', name: 'App', component: AppComponent.NAME, useAsDefault: true},
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent.NAME}
  ];
}
