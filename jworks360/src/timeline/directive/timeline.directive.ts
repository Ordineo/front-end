import IDirective = angular.IDirective;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IScope = angular.IScope;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import {TimeLineService} from "../service/timeline.service";
import {ITimeLineService} from "../service/timeline.service";
import {TimeLine} from "../model/timeline.model";
import {ITimeLineObjective} from "../model/timeline.objective.model";
import {TimeLineObjective} from "../model/timeline.objective.model";

require('vis/dist/vis.css');
require('./style.scss');

var vis = require('vis/dist/vis.js');

export class TimeLineDirective implements IDirective {
  static NAME = 'timeline';

  restrict:string = 'E';
  bindToController:any = {};
  scope:any = {};
  link:IDirectiveLinkFn = TimeLineDirective.linkFunc;
  controller:Function = TimeLineController;
  controllerAs:string = 'vm';
  template:string = require('./timeline-directive.html');
  static linkFunc(scope:any,
                  instanceElement:IAugmentedJQuery,
                  instanceAttributes:IAttributes) {

    var card = instanceElement.find('md-card-content');

    var dataItems:Array<any> = [];
    var objectives:Array<TimeLineObjective> = scope.vm.timeline.getObjectives();

    for(var i:number = 0; i < objectives.length; i++) {
      var id:number = i + 1;
      var item:ITimeLineObjective = objectives[i];
      var dataItem:any = {
        id: id,
        content: item.description,
        start: item.date
      };
      dataItems.push(dataItem);
    }

    var items = new vis.DataSet(dataItems);

    // Configuration for the Timeline
    var options = {
      start: '2016-01-01',
      end: '2016-10-31',
    };

    new vis.Timeline(card[0], items, options);
  }

  static instance() {
    return new TimeLineDirective();
  }
}

export class TimeLineController {

  static $inject:Array<string> = [TimeLineService.NAME];

  public timeline:TimeLine;

  constructor(private $timeLineService:TimeLineService) {
    this.timeline = $timeLineService.getMock();
  }
}
