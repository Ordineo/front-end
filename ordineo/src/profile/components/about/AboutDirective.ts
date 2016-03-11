import IDirective = angular.IDirective;
import {AboutDirectiveController} from "./AboutDirectiveController";

require('./about-directive-styles.scss');

export class AboutDirective implements IDirective {

  static NAME:string = "profileAbout";

  scope:any = {};
  restrict:string = 'E';
  transclude:boolean = true;
  bindToController:any = {
    functie: '@',
    unit:'@',
    description: '@'
  };
  controller:Function = AboutDirectiveController;
  controllerAs:string = '$ctrl';
  template:string = require('./about-directive-template.html');

  static instance():IDirective{
    return new AboutDirective();
  }
}
