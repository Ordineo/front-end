import {ITimeLineItem} from "./timeline.item.model";
export class TimeLine{

  constructor(private timeLineItems:Array<ITimeLineItem>){

  }

  getTimeLineItems():Array<ITimeLineItem>{
    return this.timeLineItems;
  }
}
