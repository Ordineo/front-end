import IComponentOptions = angular.IComponentOptions;
import {NotificationsController} from "./NotificationsController";
import "./notifications.scss";

export class NotificationsComponent implements IComponentOptions {
  static NAME: string = "notifications";
  static CONTROLLER_AS: string = "notifications";

  controller: Function = NotificationsController;
  controllerAs: string = NotificationsComponent.CONTROLLER_AS;
  template: string = require("./notifications.html");
  bindings: any = {
    onContentLoaded: "&"
  };
}
