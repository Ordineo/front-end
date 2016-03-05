import {ITimeLineItem} from "./timeline.item.model";
export class TimeLine{

  constructor(private objectives:Array<ITimeLineItem>){

  }

  getObjectives():Array<ITimeLineItem>{
    return this.objectives;
  }
}
