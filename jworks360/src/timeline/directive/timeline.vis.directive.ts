import IDirective = angular.IDirective;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import {TimeLine} from "../model/timeline.model";
import IDirectiveFactory = angular.IDirectiveFactory;
import {TimeLineVisController} from "./timeline.vis.controller";
import {DateUtil} from "../../util/DateUtil";
import {ITimeLineVisController} from "./timeline.vis.controller";

require('vis/dist/vis.css');
require('./style.scss');

var vis = require('vis/dist/vis.js');

//todo show extra information on click
//todo abstract away vis library as an angular component

export class TimeLineDirective implements IDirective {

  //<timeline></timeline>
  static NAME = 'timeline';

  restrict:string = 'E';
  link:IDirectiveLinkFn = this.linkFunc;
  controller:Function = TimeLineVisController;
  controllerAs:string = 'vm';
  template:string = require('./timeline-directive.html');

  private linkFunc(scope:any,
                  instanceElement:IAugmentedJQuery,
                  instanceAttributes:IAttributes):void {

    var vm:ITimeLineVisController = scope.vm;
    vm.getTimeLineItemsAsync();

    scope.$watch('vm.dataItems', (newValue, oldValue) => {
      if(newValue.length > 0){
        vm.mode = null;

        var elementToPlaceTimeLine = instanceElement.find('md-card-content')[0];
        var items = new vis.DataSet(newValue);

        var options = {
          start: DateUtil.getTimeLineStartDate(),
          end: DateUtil.getTimeLineEndDate(),
          showCurrentTime: false,
          showMajorLabels: false,
        };

        var timeline:any = new vis.Timeline(elementToPlaceTimeLine, items, options);

        timeline.on('select', (properties:any)=> {
          var id = properties.items[0];
          for(var i = 0; i < vm.dataItems.length; i++) {
            if(vm.dataItems[i].id === id) {
              vm.selectedItem = vm.dataItems[i].timeLineItem;
              scope.$digest();
            }
          }
        });
      }
    });
  }

  static instance():IDirective {
    return new TimeLineDirective();
  }
}
