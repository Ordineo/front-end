import IDirective = angular.IDirective;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import {TimeLine} from "../model/timeline.model";
import IDirectiveFactory = angular.IDirectiveFactory;
import {TimeLineVisController} from "./timeline.vis.controller";
import {DateUtil} from "../../util/DateUtil";
import {ITimeLineVisController} from "./timeline.vis.controller";
var Handlebars = require('handlebars-template-loader/runtime');
require('vis/dist/vis.css');
require('./style.scss');

var vis = require('vis/dist/vis.js');

/**
 * @ngDoc directive
 * @name timeline
 * @module jworks360.timeline
 *
 * @restrict E
 *
 * @description
 *
 * @usage
 * <timeline></timeline>
 */

//  todo abstract away vis library as an angular component
export class TimeLineDirective implements IDirective {

  static minZoom:number = 2629746000;
  static maxZoom:number = 63113904000;

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

    scope.$watch('vm.hasApiError', (newValue, oldValue) => {
      if (newValue === true) {
        //  show disabled card
        instanceElement.find('md-card-content').addClass('ng-hide');
        instanceElement.find('md-card').addClass('md-background md-hue-1');
        instanceElement.find('md-card-title-text').addClass('inactive flex');
        instanceElement.find('h3').text("Cannot connect to timeline");
      } else {
        instanceElement.find('h3').text("Timeline");
        instanceElement.find('md-card-content').removeClass('ng-hide');
        instanceElement.find('md-card').removeClass('md-background md-hue-1');
      }
    });

    scope.$watch('vm.dataItems', (newValue, oldValue) => {
      if (newValue.length > 0 && newValue !== oldValue) {
        instanceElement.find('md-card-content').empty();

        var elementToPlaceTimeLine = instanceElement.find('md-card-content')[0];
        var items = new vis.DataSet(newValue);

        var compiled: any = require('./item-template.hbs');

        var options = {
          showCurrentTime: false,
          showMajorLabels: false,
          template: function(item){
            return compiled(item);
          },
          zoomMin: TimeLineDirective.minZoom,
          zoomMax: TimeLineDirective.maxZoom
        };

        vm.timeLine = new vis.Timeline(elementToPlaceTimeLine, items, options);

        var axisOptions = {
          orientation: 'top'
        };

        var axis = new vis.timeline.components.TimeAxis(vm.timeLine.body, axisOptions);
        vm.timeLine.components.push(axis);

        vm.timeLine.setOptions({
          orientation: {
            item: 'top'
          }
        });

        // force a redraw, making the new axis visible
        vm.timeLine.redraw();

        vm.timeLine.on('select', (properties:any, evt:any)=> {
          var id = properties.items[0];
          for (var i = 0; i < vm.dataItems.length; i++) {
            if (vm.dataItems[i].id === id) {
              vm.selectedItem = vm.dataItems[i].timeLineItem;
              scope.$digest();
            }
          }
          console.log(evt);
          vm.showDialog(evt);
        });
      }
    });
  }

  static instance():IDirective {
    return new TimeLineDirective();
  }
}
