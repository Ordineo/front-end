
import IComponentOptions = angular.IComponentOptions;

export interface IProfileMenu {
  menuItems:Array<string>
}

export class ProfileMenuComponent implements IComponentOptions{
  static NAME = "profileMenu";

  controller:Function = ProfileMenuController;
  controllerAs:string = '$ctrl';
  template:string = require('./profile.menu.html');
}

class ProfileMenuController implements IProfileMenu{
  menuItems:Array<string>;

  constructor(){
    this.menuItems = [
      'About',
      'Points',
      'Learning',
      'Activity'
    ];
  }

}
