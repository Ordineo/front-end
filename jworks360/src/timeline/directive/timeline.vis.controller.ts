import {TimeLineService} from "../service/timeline.service";
import {TimeLine} from "../model/timeline.model";
import IScope = angular.IScope;
import {ITimeLineItem} from "../model/timeline.item.model";

/*
 * Fetches timeline data,
 * preps it for vis library http://visjs.org/timeline_examples.html
 * and provides it to the view
 * */
export interface ITimeLineVisController {
  getTimeLineItemsAsync():void;
  mode:string;
  dataItems:Array<any>;
}

export class TimeLineVisController implements ITimeLineVisController{

  static $inject:Array<string> = [TimeLineService.NAME];
  public dataItems:Array<any> = [];
  public mode:string = 'indeterminate';

  constructor(private timeLineService:TimeLineService) {
  }

  public getTimeLineItemsAsync():void {
    this.timeLineService
      .getMock()
      .then((timeline:TimeLine)=> {
        this.dataItems = this.getPreppedDataForVis(timeline);
      });
  }

  private getPreppedDataForVis(timeline:TimeLine):Array<any> {
    var items:Array<any> = [];

    var objectives:Array<ITimeLineItem> = timeline.getTimeLineItems();

    for (var i:number = 0; i < objectives.length; i++) {
      var id:number = i + 1;
      var item:ITimeLineItem = objectives[i];
      var dataItem:any = {
        id: id,
        content: item.description,
        start: item.date
      };
      items.push(dataItem);
    }
    return items;
  }
}
