import IDirective = angular.IDirective;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import {TimeLine} from "../model/timeline.model";
import IDirectiveFactory = angular.IDirectiveFactory;
import {TimeLineVisController} from "./timeline.vis.controller";
import {DateUtil} from "../../util/DateUtil";

require('vis/dist/vis.css');
require('./style.scss');

var vis = require('vis/dist/vis.js');

//todo show distinction between types (objective/feedback)
//todo change timeline styles
//todo show extra information on click
//todo abstract away vis library as an angular component

export class TimeLineDirective implements IDirective {

  //<timeline></timeline>
  static NAME = 'timeline';

  restrict:string = 'E';
  bindToController:boolean = true;
  link:IDirectiveLinkFn = this.linkFunc;
  controller:Function = TimeLineVisController;
  controllerAs:string = 'vm';
  transclude:boolean = true;
  template:string = require('./timeline-directive.html');

  private linkFunc(scope:any,
                  instanceElement:IAugmentedJQuery,
                  instanceAttributes:IAttributes):void {
    scope.vm.getMockData();
    scope.vm.mode = "indeterminate";
    scope.$watch('vm.dataItems', (newValue, oldValue) => {
      //todo find a better way to prevent the timeline from being drawn more than once
      if(newValue.length > 0){
        scope.vm.mode = null;
        console.log(newValue);
        var elementToPlaceTimeLine = instanceElement.find('md-card-content')[0];
        var items = new vis.DataSet(newValue);

        var options = {
          start: DateUtil.getTimeLineStartDate(),
          end: DateUtil.getTimeLineEndDate(),
        };

        new vis.Timeline(elementToPlaceTimeLine, items, options);
      }
    });
  }

  static instance():IDirective {
    return new TimeLineDirective();
  }
}
