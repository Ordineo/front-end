import IComponentOptions = angular.IComponentOptions;
import {MilestoneService} from "../../services/MilestoneService";
import {Objective} from "../../../core/models/objective";
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import IFormController = angular.IFormController;
import "./objectives-search.scss";
import {ScopeObserver} from "../../../core/services/ScopeObserver";
import {fromPromise} from "rxjs/observable/fromPromise";
import {Observable, Subscription} from "rxjs/Rx";
import IPromise = angular.IPromise;

export class ObjectivesSearch implements IComponentOptions {
  static NAME: string = "objectivesSearch";

  require: string | string[] | {[controller: string]: string} = {
    "formCtrl": "^form"
  };

  bindings: any = {
    onSelected: "&"
  };

  controller: any = ObjectivesSearchController;
  template: string = require("./objectives-search-template.html");
}
export class ObjectivesSearchController {
  public formCtrl: IFormController;
  public deferred: IDeferred<any>;
  public onSelected: Function;
  public objectives: Objective[] = [];

  public searchStream: Observable<any>;
  public subscription: Subscription;

  static $inject: string[] = [
    "$q",
    "$scope",
    MilestoneService.NAME,
    ScopeObserver.NAME,
  ];

  constructor(private $q: IQService,
              private $scope: angular.IScope,
              private milestoneService: MilestoneService,
              private scopeObserver: ScopeObserver) {
  }

  selectedItemChange(selectedObjective: Objective): void {
    this.onSelected({objective: selectedObjective});
  }

  searchObjectives(): IPromise<any> {
    this.deferred = this.$q.defer();
    this.subscription = this.searchStream
      .flatMap((qry: string) => {
        return fromPromise(this.milestoneService.searchObjectives(qry));
      })
      .map((response: any) => {
        let objectives: Objective[] = response.data["_embedded"].objectives;
        this.deferred.resolve(objectives);
      })
      .subscribe();
    return this.deferred.promise;
  }

  $onInit(): void {
    this.searchStream = this.scopeObserver
      .watch(this.$scope, "$ctrl.searchText")
      .filter((qry: string) => {
        return qry !== undefined && qry !== null && qry !== "";
      })
      .debounceTime(750)
      .distinctUntilChanged();
  }

  $onDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
