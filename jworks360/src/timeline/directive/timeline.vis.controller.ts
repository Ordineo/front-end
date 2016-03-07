import {TimeLineService} from "../service/timeline.service";
import {TimeLine} from "../model/timeline.model";
import IScope = angular.IScope;
import {ITimeLineItem} from "../model/timeline.item.model";
import {TimeLineItemType} from "../model/timeline.item.model";
import {TimeLineJSONParser} from "../service/timeline.service.jsonparser";
import IPromise = angular.IPromise;

/*
 * Fetches timeline data,
 * preps it for vis library http://visjs.org/timeline_examples.html
 * and provides it to the view
 * */
export interface ITimeLineVisController {
  getTimeLineItemsAsync():void;
  mode:string;
  selectedItem:ITimeLineItem;
  dataItems:Array<any>;
}

export class TimeLineVisController implements ITimeLineVisController{

  static $inject:Array<string> = [TimeLineService.NAME, TimeLineJSONParser.NAME];
  public dataItems:Array<any> = [];
  public mode:string = 'indeterminate';
  public selectedItem:ITimeLineItem;

  constructor(private timeLineService:TimeLineService, private parser:TimeLineJSONParser) {
  }

  //todo implement on error callback
  public getTimeLineItemsAsync():void {
    this.timeLineService
      .getTimelineByUserName('gide')
      .then((result:any)=> {
        this.dataItems = this.getPreppedDataForVis(this.parser.parse(result.data));
      });
  }

  private getPreppedDataForVis(timeline:TimeLine):Array<any> {
    var items:Array<any> = [];

    var objectives:Array<ITimeLineItem> = timeline.getTimeLineItems();

    for (var i:number = 0; i < objectives.length; i++) {
      var id:number = i + 1;
      var item:ITimeLineItem = objectives[i];
      var dataItem:any = {
        className: this.getClassByType(item.type),
        id: id,
        content: this.getContentByType(item),
        start: item.date,
        title: item.moreInformation,
        timeLineItem: item
      };
      items.push(dataItem);
    }
    return items;
  }

  private getContentByType(item:ITimeLineItem):string{
    if(item.type === TimeLineItemType.FEEDBACK) {
      return `"${item.description}" - <span class="reviewer">${item.reviewer}</span>`
    }else{
      return item.description;
    }
  }

  private getClassByType(type:string):string{
    console.log(type);
    if(type === TimeLineItemType.FEEDBACK) {
      return 'feedback'
    } else if (type === TimeLineItemType.OBJECTIVE){
      return 'blue';
    }else{
      return '';
    }
  }
}
