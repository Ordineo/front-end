import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import {Milestone} from "../../core/models/milestone";
import {Objective} from "../../core/models/objective";
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;

export interface IMilestoneService {
  notifyMilestoneSelected(): void;
  subscribeOnMilestoneSelected(scope: IScope, callBack: any): void;
  getMilestonesByUsername(userName: string): IPromise<any>;
  getMilestoneById(id: string): IPromise<any>;
  clearSelected(): void;
  setObjective(objective: Objective): void;
  getNewMilestone(): Milestone;
  searchObjectives(qry: string): IPromise<any>;
  createMilestoneByUsername(username: string): IPromise<any>;
  setSelectedMilestone(milestone: Milestone): void;
  getSelectedMilestone(): Milestone;
  put(milestone: Milestone): IPromise<any>;
}

export class MilestoneService implements IMilestoneService {
  static NAME: string = "MilestoneService";
  static EVENT_MILESTONE_SELECTED: string = "milestoneSelected";

  public milestone: Milestone;
  public dueDate: Date;
  public selectedMilestone: Milestone;

  static $inject: Array<string> = [
    "$rootScope",
    TraversonHalService.SERVICE_NAME,
    "$q",
    "$http",
    "moment"];

  constructor(private $rootScope: IRootScopeService,
              private traverson: TraversonHalService,
              private $q: IQService,
              private $http: IHttpService,
              private moment: any) {
  }

  public subscribeOnMilestoneSelected(scope: IScope, callBack: any): void {
    var handler: any = this.$rootScope.$on(MilestoneService.EVENT_MILESTONE_SELECTED, callBack);
    scope.$on("$destroy", handler);
  }

  public notifyMilestoneSelected(): void {
    this.$rootScope.$emit(MilestoneService.EVENT_MILESTONE_SELECTED, {milestone: this.getSelectedMilestone()});
  }

  setSelectedMilestone(milestone: Milestone): void {
    this.selectedMilestone = milestone;
    this.notifyMilestoneSelected();
  }

  getSelectedMilestone(): Milestone {
    return this.selectedMilestone;
  }

  clearSelected(): void {
    this.selectedMilestone = null;
    this.notifyMilestoneSelected();
  }

  setObjective(objective: Objective): void {
    this.milestone.objective = objective;
  }

  public getMilestoneById(id: string): IPromise<any> {
    return this.traverson.hal()
      .from(GatewayApiService.getMilestonesApi() + "milestones/" + id)
      .useAngularHttp()
      .jsonHal()
      .getResource()
      .result;
  }

  public getMilestonesByUsername(userName: string): IPromise<any> {
    return this.traverson.hal()
      .from(GatewayApiService.getMilestonesApi() + "milestones/search")
      .useAngularHttp()
      .jsonHal()
      .follow("findByUsername", "milestones[$all]")
      .withTemplateParameters({username: userName})
      .getResource()
      .result;
  }

  public getNewMilestone(): Milestone {
    this.milestone = <Milestone>{};
    this.milestone.dueDate = new Date();
    return this.milestone;
  }

  public searchObjectives(qry: string): IPromise<any> {
    return this.$http
      .get(GatewayApiService.getMilestonesApi() + `objectives/search/findByTitleOrTags?text=${qry}`);
  }

  public createMilestoneByUsername(username: string): IPromise<any> {
    if (this.milestone.objective && this.milestone.objective["_links"]) {
      this.milestone["username"] = username;
      this.milestone.title = this.milestone.objective.title;
      this.milestone["objective"] = this.milestone.objective["_links"]["self"]["href"];
      this.milestone["createDate"] = this.moment(this.milestone["createDate"]).format("YYYY-MM-DD");
      this.milestone["dueDate"] = this.moment(this.dueDate).format("YYYY-MM-DD");
      return this.$http.post(GatewayApiService.getCreateMilestonesApi(), this.milestone);
    } else {
      return null;
    }
  }

  public getCommentsByMilestone(milestone: Milestone): IPromise<any> {
    return this.traverson.hal()
      .from(GatewayApiService.getMilestonesApi() + "comments/search/findCommentsByMilestone?milestone=" + GatewayApiService.getMilestonesApi() + milestone)
      .useAngularHttp()
      .jsonHal()
      .getResource()
      .result;
  }

  public createCommentByMilestone(username: string, createDate: string, message: string, milestone: string): IPromise<any> {
    return this.$http.post(GatewayApiService.getMilestonesApi() + "comments", {
      "username": username,
      "createDate": createDate,
      "message": message,
      "milestone": GatewayApiService.getMilestonesApi() + milestone
    });
  }


  put(milestone: Milestone): angular.IPromise<any> {

    // milestone.objective = url;
    return this.$http.put(milestone["_links"].self.href,
      this.getPutPayload(milestone));
  }

  private getPutPayload(milestone: Milestone): any {
    let objectiveUrl: string = milestone.objective["_links"].self.href;
    let url: string = objectiveUrl.substr(0, objectiveUrl.indexOf("{"));
    let dateFormat = "YYYY-MM-DD";
    return {
      "objective": url,
      "username": milestone["username"],
      "createDate": this.moment(milestone.createDate).format(dateFormat),
      "dueDate": this.moment(milestone.dueDate).format(dateFormat),
      "endDate": milestone.endDate ? this.moment(milestone.endDate).format(dateFormat) : null,
      "moreInformation": milestone.moreInformation
    };
  }
}
export interface MilestoneSelectedData {
  milestone: Milestone;
}
