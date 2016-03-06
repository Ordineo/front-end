import IComponentOptions = angular.IComponentOptions;

require('./header-component-styles.scss');
export class HeaderComponent implements IComponentOptions{
  //<home-header></home-header>
  static NAME = "homeHeader";

  bindings:any = {
    title: '@',
  };
  controllerAs:string = '$ctrl';
  controller:Function = HeaderComponentCtrl;
  template:string = require('./header-component-template.html');
}
export class HeaderComponentCtrl{
  static DEFAULT_TITLE:string = "";

  public title:string = HeaderComponentCtrl.DEFAULT_TITLE;
}
