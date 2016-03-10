
import IComponentOptions = angular.IComponentOptions;

require('./tab-menu-styles.scss');

export interface IProfileMenu {
  menuItems:Array<string>
}

export class TabMenuComponent implements IComponentOptions{
  static NAME = "tabMenu";
  bindings:any = {
    'menuItems': '<'
  };
  controller:Function = TabMenuCtrl;
  controllerAs:string = '$ctrl';
  template:string = require('./tab-menu-template.html');
}

class TabMenuCtrl implements IProfileMenu{
  public menuItems:Array<string>;

  constructor(){
  }

}
