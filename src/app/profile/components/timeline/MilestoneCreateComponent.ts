import IComponentOptions = angular.IComponentOptions;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;

export class MilestoneCreateComponent implements IComponentOptions {
  static NAME:string = "milestoneCreate";
  controller:any = MilestoneCreateController;
  template:string = require('./MilestoneCreate-template.html');
  bindings:any = {
    username: '@',
    onContentLoaded: '&'
  };
}

export class MilestoneCreateController {
  public title:string = "MilestoneCreate";
  public username:string;
  public onContentLoaded:Function;

  constructor() {

  }


  $onInit():void {
    this.onContentLoaded({isLoaded: true});
  }
}
