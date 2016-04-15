import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import {MilestoneService} from "../../services/MilestoneService";
import IScope = angular.IScope;
import {HeaderController} from "../../../layout/header/HeaderController";
import IAngularEvent = angular.IAngularEvent;
require('./milestone-styles.scss');

export class MilestoneContainerComponent implements IComponentOptions {
  static NAME:string = "milestoneContainer";
  controller:any = MilestoneContainerController;
  template:string = require('./MilestoneContainer-template.html');
  bindings:any = {
    username: '@'
  };
}

export class MilestoneContainerController {
  public title:string = "Timeline"; //todo
  public username:string;
  public isContentLoaded:boolean = false ;

  constructor() {

  }

  $onInit():void {

  }

  public loaded(isLoaded:any):void {
    this.isContentLoaded = isLoaded;
  }
}
