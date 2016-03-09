import {TimeLineService} from "../service/timeline.service";
import {TimeLine} from "../model/timeline.model";
import IScope = angular.IScope;
import {ITimeLineItem} from "../model/timeline.item.model";
import {TimeLineItemType} from "../model/timeline.item.model";
import {TimeLineJSONParser} from "../service/timeline.service.jsonparser";
import IPromise = angular.IPromise;
import {StringUtil} from "../../util/StringUtil";
import IDialogService = angular.material.IDialogService;
import IDialogOptions = angular.material.IDialogOptions;

require('vis/dist/vis.css');
require('./style.scss');

var vis = require('vis/dist/vis.js');
/*
 * Fetches timeline data,
 * preps it for vis library http://visjs.org/timeline_examples.html
 * and provides it to the view
 *
 * */
export interface ITimeLineVisController {
  getTimeLineItemsAsync():void;
  mode:string;
  selectedItem:ITimeLineItem;
  dataItems:Array<any>;
  timeLine:any;
  isRequestPending:boolean;
  showMore:boolean;
  showDialog:Function;
}

export class TimeLineVisController implements ITimeLineVisController {
  static $inject:Array<string> = ['$mdDialog', TimeLineService.NAME, TimeLineJSONParser.NAME];
  public dataItems:Array<any> = [];
  public mode:string = 'indeterminate';
  public selectedItem:ITimeLineItem;
  public hasApiError:boolean = false;
  public timeLine:any;
  public isRequestPending:boolean;
  public showMore:boolean = false;

  constructor(private $mdDialog:IDialogService, private timeLineService:TimeLineService, private parser:TimeLineJSONParser) {
  }

  public showDialog(event):void {
    var options:IDialogOptions = {
      clickOutsideToClose: true,
      template: `
      <md-dialog flex="30">
        <md-dialog-content>
         <p class="md-caption">{{date | amUtc | amDateFormat:'dddd, MMMM Do YYYY'}}</p>
         <p class="md-subhead">{{description}}</p>
         <p class="md-body-1">{{info}}</p>
         <div>
         <md-chips ng-repeat="x in tags">`
          + '<md-chip >{{x}}</md-chip>' +
        `</md-chips>
         {{tags}}
        </div>
        </md-dialog-content>
      </md-dialog>`,
      controller: ($scope, $mdDialog)=> {
        $scope.date = this.selectedItem.date;
        $scope.description = this.selectedItem.description;
        $scope.info = this.selectedItem.moreInformation;
        $scope.tags = this.selectedItem.tags;
      }
    };
    this.$mdDialog.show(options);
  }

  public getTimeLineItemsAsync():void {
    this.selectedItem = null;
    this.isRequestPending = true;

    this.timeLineService
      .getTimelineByUserName('gide')
      .then((result:any)=> {
        this.isRequestPending = false;
        this.hasApiError = false;
        this.dataItems = this.getPreppedDataForVis(this.parser.parse(result.data));
      }, (error:any) => {
        this.isRequestPending = false;
        this.hasApiError = true;
      });
  }

  public toggleInfo():void {
    this.showMore = !this.showMore;
  }

  public getMock():void {
    this.isRequestPending = true;
    this.selectedItem = null;

    this.timeLineService
      .getMock()
      .then((data:any)=> {
        this.isRequestPending = false;
        this.hasApiError = false;
        this.dataItems = this.getPreppedDataForVis(data);
      }, (error:any)=> {
        this.isRequestPending = false;
        this.hasApiError = true;
      });
  }

  private getPreppedDataForVis(timeline:TimeLine):Array<any> {
    var items:Array<any> = [];

    var objectives:Array<ITimeLineItem> = timeline.getTimeLineItems();

    for (var i:number = 0; i < objectives.length; i++) {
      var id:number = i + 1;
      var item:ITimeLineItem = objectives[i];
      item.shortInfo = StringUtil.createShortVersion(item.moreInformation);

      var dataItem:any = {
        className: this.getClassByType(item.type),
        id: id,
        content: this.getContentByType(item),
        start: item.date,
        title: item.moreInformation,
        timeLineItem: item,
        shortDescription: StringUtil.createShortVersion(item.description)
      };
      items.push(dataItem);
    }

    return items;

  }

  private getContentByType(item:ITimeLineItem):string {
    if (item.type === TimeLineItemType.FEEDBACK) {
      return `${item.description}`;
    } else {
      return item.description;
    }
  }

  private getClassByType(type:string):string {
    if (type === TimeLineItemType.FEEDBACK) {
      return 'feedback'
    } else if (type === TimeLineItemType.OBJECTIVE) {
      return 'blue';
    } else {
      return '';
    }
  }
}
