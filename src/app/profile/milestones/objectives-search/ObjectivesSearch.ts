import IComponentOptions = angular.IComponentOptions;
import {MilestoneService} from "../../services/MilestoneService";
import IRxScope = rx.angular.IRxScope;
import {Objective} from "../../../core/models/objective";
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import IPromise = Rx.IPromise;
import IFormController = angular.IFormController;
import "./objectives-search.scss";

export class ObjectivesSearch implements IComponentOptions {
  static NAME: string = "objectivesSearch";

  require: Object = {
    formCtrl: "^form"
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

  static $inject:string[] = ["$q", "rx", "$scope", MilestoneService.NAME];

  constructor(private $q: IQService, private rx: any, private $scope: IRxScope, private milestoneService: MilestoneService) {
    this.deferred = this.$q.defer();
  }

  getObjectives(): IPromise<any> {
    this.deferred = this.$q.defer();
    return this.deferred.promise.then((data) => {
      return data;
    });
  }

  selectedItemChange(selectedObjective: Objective): void {
    this.onSelected({objective: selectedObjective});
  }

  $onInit(): void {
    this.$scope
      .$toObservable("$ctrl.searchText")
      .debounce(400)
      .map((data: any) => {
        return data.newValue;
      })
      .distinctUntilChanged()
      .flatMapLatest((qry: string) => {
        if (qry !== "") {
          return this.rx.Observable
            .fromPromise(this.milestoneService.searchObjectives(qry));
        } else {
          return Rx.Observable.empty<Objective>();
        }
      })
      .subscribe((objectives: Objective[]) => {
        this.objectives = objectives;
        this.deferred.resolve(objectives);
      });
  }
}
