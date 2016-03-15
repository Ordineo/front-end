import IComponentOptions = angular.IComponentOptions;

require('./header.scss');

/**
 * @ngdoc Component
 */
export class HeaderV2Component implements IComponentOptions{

  static NAME:string = "headerV2";

  controller:Function = HeaderV2ComponentController;
  controllerAs:string = '$ctrl';
  template:string = require('./header.html');
}

export class HeaderV2ComponentController{

  public menuItems:Array<string>;

  constructor(){
  }

}
