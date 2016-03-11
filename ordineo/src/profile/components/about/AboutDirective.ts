import IDirective = angular.IDirective;
import {AboutDirectiveController} from "./AboutDirectiveController";

require('./about-directive-styles.scss');

export class AboutDirective implements IDirective {

  static NAME:string = "profileAbout";

  restrict:string = 'E';
  bindToController:any = {};
  scope:any = {};
  controller:Function = AboutDirectiveController;
  controllerAs:string = '$ctrl';
  template:string = require('./about-template.html');

  static instance():IDirective{
    return new AboutDirective();
  }
}
