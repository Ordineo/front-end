import IComponentOptions = angular.IComponentOptions;
import {AboutDirectiveController} from "./AboutComponentController";
import "./about-card-styles.scss";

export class AboutComponent implements IComponentOptions {
  static NAME: string = "aboutCard";

  template: string|Function|string|Function[] = require("./about-card-template.html");
  controller: string|Function|string|Function[] = AboutDirectiveController;
  controllerAs: string = "about";
}
