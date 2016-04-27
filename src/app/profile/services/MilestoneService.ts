import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import {Milestone} from "../../core/models/milestone";
import {Objective} from "../../core/models/objective";

export interface IMilestoneService {
  getMilestonesByUsername(userName:string):IPromise<any>;
  setObjective(objective:Objective):void;
  getNewMilestone():Milestone;
  searchObjectives(qry:string):IPromise<any>;
  createMilestoneByUsername(username:string):IPromise<any>
}

export class MilestoneService implements IMilestoneService{
  public milestone:Milestone;
  public dueDate:Date;
  static NAME:string = "MilestoneService";
  static $inject:Array<string> = [
    TraversonHalService.SERVICE_NAME,
    GatewayApiService.SERVICE_NAME,
    '$q',
    '$http',
    'moment'];

  constructor(private traverson:TraversonHalService,
              private gateway:GatewayApiService,
              private $q:IQService,
              private $http:IHttpService,
              private moment:any) {
  }

  setObjective(objective:Objective):void{
    this.milestone.objective = objective;
  }

  public getMilestonesByUsername(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getMilestonesApi() + 'milestones/search')
      .jsonHal()
      .follow('findByUsername', 'milestones[$all]')
      .withTemplateParameters({username: userName})
      .getResource()
      .result;
  }

  public getNewMilestone():Milestone{
    this.milestone = <Milestone>{};
    this.milestone.dueDate = new Date();
    return this.milestone;
  }

  public searchObjectives(qry:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getMilestonesApi() + 'objectives/search')
      .jsonHal()
      .follow('findByTitleOrTags', 'objectives[$all]')
      .withTemplateParameters({text: qry})
      .getResource()
      .result;
  }

  public createMilestoneByUsername(username:string):IPromise<any> {
    if(this.milestone.objective && this.milestone.objective['_links']) {
      this.milestone['username'] = username;
      this.milestone.title = this.milestone.objective.title;
      this.milestone['objective'] = this.milestone.objective['_links']['self']['href'];
      this.milestone['createDate'] = this.moment(this.milestone['createDate']).format("YYYY-MM-DD");
      this.milestone['dueDate'] = this.moment(this.dueDate).format("YYYY-MM-DD");
      return this.$http.post(this.gateway.getMilestonesApi() + 'milestones/', this.milestone);
    } else {
      return null;
    }
  }
}
