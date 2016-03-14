import IComponentOptions = angular.IComponentOptions;

require('./header-v2-styles.scss');

/**
 * @ngdoc Component
 */
export class HeaderV2Component implements IComponentOptions{

  static NAME:string = "headerV2";

  controller:Function = HeaderV2ComponentController;
  controllerAs:string = '$ctrl';
  template:string = require('./header-v2-template.html');
}

export class HeaderV2ComponentController{

  public menuItems:Array<string>;

  constructor(){
  }

}
