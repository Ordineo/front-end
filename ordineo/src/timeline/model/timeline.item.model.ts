export interface ITimeLineItem{
  type:string;
  description:string;
  moreInformation:string;
  reviewer:string;
  tags:Array<string>;
  date:string;
  shortInfo?:string;
}

export class TimeLineItemType{
  static OBJECTIVE = 'Objective';
  static FEEDBACK = 'Feedback';
}
