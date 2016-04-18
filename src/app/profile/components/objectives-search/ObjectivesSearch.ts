import IComponentOptions = angular.IComponentOptions;
import Observable = Rx.Observable;
import {MilestoneService} from "../../services/MilestoneService";
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import IRxScope = rx.angular.IRxScope;
import {Objective} from "../../../core/models/objective";
export class ObjectivesSearch implements IComponentOptions {
  static NAME:string = "objectivesSearch";

  controller:any = ObjectivesSearchController;
  template:string = require('./objectives-search-template.html');
}
export class ObjectivesSearchController {

  public objectives:Objective[] = [];

  static $inject = ['rx', '$scope', 'observeOnScope', MilestoneService.NAME];

  constructor(private rx:any, private $scope:IRxScope, private observeOnScope:any, private milestoneService:MilestoneService) {
  }

  selectedItemChange(data:any):void {

  }

  querySearch(query:any):any {
    if (!this.objectives) {
      this.objectives = [];
    }
    return this.objectives;
  }

  filter(query):any {

  }

  $onInit():void {
    this.$scope
      .$toObservable('$ctrl.searchText')
      .debounce(400)
      .map((data:any)=> {
        return data.newValue;
      })
      .distinctUntilChanged()
      .flatMapLatest((qry:string)=> {
        if (qry !== '') {
          return this.rx.Observable
            .fromPromise(this.milestoneService.searchObjectives(qry))
        } else {
          return Rx.Observable.empty<string>();
        }
      })
      .subscribe((objectives:Objective[])=> {
        console.log(objectives);

        this.objectives = objectives;
      });
  }
}
