import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";

export class MilestoneCommentsController {
  //Comments
  public commentFirstName:string = "Ryan";
  public commentLastName:string = "De Gruyter";
  public message:string = "You should also go for the OCP certificate.";
  public timestamp:string = "09:18, 15 February";
  public comments:any[];

  static $inject = ['$scope', MilestoneService.NAME];

  constructor(private scope:IScope, private milestoneService:IMilestoneService) {
  }

  $onInit():void {
    var milestone:any = this.milestoneService.getSelectedMilestone();
    if (milestone) {
      this.comments = milestone.comments;
    }
    this.milestoneService.subscribeOnMilestoneSelected(this.scope, ()=> {
      var mile:any = this.milestoneService.getSelectedMilestone();
      if (mile) {
        this.comments = mile.comments;
        console.log(this.comments);
      }
    });
  }
}
