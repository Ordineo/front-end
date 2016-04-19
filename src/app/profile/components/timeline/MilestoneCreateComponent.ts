import IComponentOptions = angular.IComponentOptions;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import {Milestone} from "../../../core/models/milestone";
import IFormController = angular.IFormController;

export class MilestoneCreateComponent implements IComponentOptions {
  static NAME:string = "milestoneCreate";
  controller:any = MilestoneCreateController;
  template:string = require('./MilestoneCreate-template.html');
  bindings:any = {
    username: '@',
    onContentLoaded: '&',
    isSaveEnabled: '&'
  };
}

export class MilestoneCreateController {
  public title:string = "MilestoneCreate";
  public username:string;
  public onContentLoaded:Function;
  public isSaveEnabled:Function;
  public minDate:Date;

  public milestone:Milestone;

  static $inject = ['$scope'];

  constructor(private scope:IScope) {
    this.milestone = <Milestone>{};
    this.milestone.createDate = new Date();
    this.milestone.dueDate = new Date();
    this.minDate = new Date();
  }

  $onInit():void {
    this.onContentLoaded({isLoaded: true});
    this.scope.$watch('milestoneCreateForm.$valid', ()=> {
      this.isSaveEnabled({isEnabled: this.scope['milestoneCreateForm'].$valid});
    });
  }

  private save():void {
    this.milestone.createDate = new Date();
  }
}
